import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from "moment";

import Panel from "./Panel";
import MeasurementToggle from "./MeasurementToggle";
import Loader from "./Loader";

import { fetchWeatherData } from "../ducks/weather";
import getTodaysForecast from "../utils/getTodaysForecast";
import getFiveDayForecast from "../utils/getFiveDayForecast";
import celsiusToFahrenheit from "../utils/celsiusToFahrenheit";
import roundedCumulativeMovingAverage from "../utils/roundedCumulativeMovingAverage";

const mapStateToProps = state => ({
    system: state.measurementSystem,
    location: state.location,
    todaysForecast: getTodaysForecast(state.weatherData),
    fiveDayForecast: getFiveDayForecast(state.weatherData),
    mostRecentDatapoint: state.weatherData[0],
});

@connect(mapStateToProps, { fetchWeatherData })
class MainPanel extends Component {
    static getIcon(weatherId, time = null) {
        const hour = time || parseInt(moment().format('H'), 10); // Use preset hour or 'now'
        return `wi wi-owm-${hour > 6 && hour < 18 ? 'day' : 'night'}-${weatherId}`;
    }

    static getUnspecifiedTimeIcon(weatherId) {
        return `wi wi-owm-${weatherId}`;
    }

    componentDidMount() {
        const { lat, lon } = this.props.location;
        if (lat && lon) {
            this.props.fetchWeatherData(lat, lon);
        }
    }

    formatDegreeSymbol() {
        return `°${this.props.system === 'c' ? 'C' : 'F'}`;
    }

    formatTemp(deg) {
        return Math.round(this.props.system === 'c' ? deg : celsiusToFahrenheit(deg));
    }

    renderFiveDayForecast() {
        // Step 3: Render what we ended up with
        return Object.entries(this.props.fiveDayForecast).map(([day, dayData]) => (
            <div className="day" key={`fc-${day}`}>
                {day}
                <i className={MainPanel.getUnspecifiedTimeIcon(dayData.weatherId)} />
                {this.formatTemp(roundedCumulativeMovingAverage(dayData.temp))}{this.formatDegreeSymbol()}
            </div>
        ));
    }

    renderTodaysForecast() {
        return Object.entries(this.props.todaysForecast).map(([partOfDay, temp]) => {
            if (temp) {
                return (
                    <div key={`fc-${partOfDay}`}>
                        {partOfDay} {this.formatTemp(temp)}{this.formatDegreeSymbol()}
                    </div>
                );
            }

            return null;
        });
    }

    render() {
        const mostRecent = this.props.mostRecentDatapoint;

        if (!mostRecent) {
            return (<Loader />);
        }

        return (
            <Panel classes="main">
                <MeasurementToggle />
                <button onClick={(e) => { e.preventDefault(); this.props.togglePanel(); }} className="return" />
                <h1>{this.props.location.city}</h1>
                <div className="today">
                    <h2>{moment().format("dddd, MMMM Do YYYY")}</h2>
                    <h3>{mostRecent.weather[0].description}</h3>
                    <div className="huge">
                        {this.formatTemp(mostRecent.main.temp)} {this.formatDegreeSymbol()}
                    </div>
                    <i className={MainPanel.getIcon(mostRecent.weather[0].id)} />
                    <div className="forecast">
                        {this.renderTodaysForecast()}
                    </div>
                </div>
                <div className="future">
                    {this.renderFiveDayForecast()}
                </div>
            </Panel>
        );
    }
}

MainPanel.propTypes = {
    system: PropTypes.oneOf(['f', 'c']),
    location: PropTypes.shape({
        city: PropTypes.string,
        lat: PropTypes.number,
        lon: PropTypes.number,
    }),
    todaysForecast: PropTypes.shape({
        morning: PropTypes.number,
        day: PropTypes.number,
        evening: PropTypes.number,
        night: PropTypes.number,
    }),
    mostRecentDatapoint: PropTypes.shape({
        main: PropTypes.shape({
            temp: PropTypes.number,
        }),
        weather: PropTypes.arrayOf(PropTypes.shape({
            description: PropTypes.string,
            id: PropTypes.number,
        })),
    }),
    fiveDayForecast: PropTypes.objectOf(PropTypes.shape({
        temp: PropTypes.arrayOf(PropTypes.number),
        weatherId: PropTypes.number,
    })),
    fetchWeatherData: PropTypes.func,
    togglePanel: PropTypes.func.isRequired,
};

MainPanel.defaultProps = {
    system: 'f',
    location: { city: "Unknown", lat: 0, lon: 0 },
    todaysForecast: {
        morning: null,
        day: null,
        evening: null,
        night: null,
    },
    fiveDayForecast: {},
    mostRecentDatapoint: null,
    fetchWeatherData: () => {}, // no-op
};

export default MainPanel;

