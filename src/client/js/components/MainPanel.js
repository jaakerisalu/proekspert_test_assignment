import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from "moment";
import Panel from "./Panel";
import MeasurementToggle from "./MeasurementToggle";
import { fetchWeatherData } from "../ducks/weather";

const mapStateToProps = state => ({
    system: state.measurementSystem,
    location: state.location,
    weatherData: state.weatherData,
});

@connect(mapStateToProps, { fetchWeatherData })
class MainPanel extends Component {
    componentDidMount() {
        const { lat, lon } = this.props.location;
        if (lat && lon) {
            console.log('DOING THE FETCH', lat, lon);
            this.props.fetchWeatherData(lat, lon);
        }
    }

    getIcon(weatherId, time = null) {
        const hour = time || parseInt(moment().format('H'), 10); // Use preset hour or 'now'
        return `wi wi-owm-${hour > 6 && hour < 18 ? 'day' : 'night'}-${weatherId}`;
    }

    getUnspecifiedTimeIcon(weatherId) {
        return `wi wi-owm-${weatherId}`;
    }

    getPartOfDay(hour) {
        // Consider morning to be 03 -> 06, day to be 09 -> 12, evening to be 15 -> 18, night to be 21 -> 00
        const legend = {
            0: 'night',
            3: 'morning',
            6: 'morning',
            9: 'day',
            12: 'day',
            15: 'evening',
            18: 'evening',
            21: 'night',
        };

        return legend[parseInt(hour, 10)];
    }

    getTodaysForecast() {
        const forecast = {
            morning: null,
            day: null,
            evening: null,
            night: null,
        };

        // Step 1: Find the relevant datapoins (from times that are still to come today)
        const relevantDatapoints = this.props.weatherData.filter(
            dataPoint => moment.unix(dataPoint.dt).utc().format('DD') === moment().utc().format('DD'));

        // Step 2: Match the datapoints to subjectiv 'parts of day'
        relevantDatapoints.forEach((dp) => {
            const pod = this.getPartOfDay(moment.unix(dp.dt).utc().format('H'));  // part of day
            if (!forecast[pod]) {
                forecast[pod] = dp.main.temp;
            } else {  // If I get 2 datapoints for one part of day, take the average
                // Average the 2 datapoints together
                forecast[pod] = (forecast[pod] + dp.main.temp) / 2;
            }
        });

        // Step 3: Render what we ended up with
        return Object.entries(forecast).map(([partOfDay, temp]) => {
            if (temp) {
                return (
                    <div key={`fc-${partOfDay}`}>{partOfDay} {this.formatTemp(temp)}{this.formatDegreeSymbol()}</div>
                );
            }

            return null;
        });
    }

    getFiveDayForecast() {
        // Step 1: Find the relevant datapoins (from times that are NOT from today)
        const relevantDatapoints = this.props.weatherData.filter(
            dataPoint => moment.unix(dataPoint.dt).utc().format('DD') !== moment().utc().format('DD'));

        const data = {};
        // Step 2: Group the datapoints by day, average out the temperature, pick an icon somehow I guess?
        relevantDatapoints.forEach((dp) => {
            // Since we have < week of data I can just use the day as key, no conflicts
            const dayOfWeek = moment.unix(dp.dt).utc().format('dddd');
            if (!data[dayOfWeek]) {
                data[dayOfWeek] = { temp: [dp.main.temp], weatherId: dp.weather[0].id };  // WeatherId used for icon
            } else {  // If I get more datapoints for a day, average the temperatures
                // Try to get a weatherId as close to 15:00 as possible as what I consider a good baseline
                data[dayOfWeek].temp.push(dp.main.temp);

                // Datapoints are sorted by time, so it's always 3 o clock -> 6 o clock -> 9 o clock etc
                if (parseInt(moment.unix(dp.dt).utc().format('H'), 10) <= 15) {
                    // Overwrite the old one since this comes later in the day, but not after 3 PM
                    data[dayOfWeek].weatherId = dp.weather[0].id;
                }
            }
        });

        // Step 3: Render what we ended up with
        return Object.entries(data).map(([day, dayData]) => {
            return (
                <div className="day" key={`fc-${day}`}>
                    {day}
                    <i className={this.getUnspecifiedTimeIcon(dayData.weatherId)} />
                    {this.formatTemp(this.roundedCumulativeMovingAverage(dayData.temp))}{this.formatDegreeSymbol()}
                </div>
            );
        });
    }

    formatDegreeSymbol() {
        return `°${this.props.system === 'c' ? 'C' : 'F'}`;
    }

    formatTemp(deg) {
        return Math.round(this.props.system === 'c' ? deg : this.celsiusToFahrenheit(deg));
    }

    celsiusToFahrenheit(deg) {
        return (deg * (9 / 5)) + 32;
    }

    roundedCumulativeMovingAverage(arr) {
        return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
    }

    render() {
        const mostRecent = this.props.weatherData[0];

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
                    <i className={this.getIcon(mostRecent.weather[0].id)} />
                    <div className="forecast">
                        {this.getTodaysForecast()}
                    </div>
                </div>
                <div className="future">
                    {this.getFiveDayForecast()}
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
    weatherData: PropTypes.arrayOf(PropTypes.shape()),
    fetchWeatherData: PropTypes.func,
    togglePanel: PropTypes.func.isRequired,
};

MainPanel.defaultProps = {
    system: 'f',
    location: { city: "Unknown", lat: 0, lon: 0 },
    weatherData: [],
    fetchWeatherData: () => {},  // no-op
};

export default MainPanel;

