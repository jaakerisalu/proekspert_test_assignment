import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainPanel from "./MainPanel";
import LocationPanel from "./LocationPanel";

const mapStateToProps = state => ({
    location: state.location,
});

@connect(mapStateToProps, null)
class WeatherApp extends Component {
    static propTypes = {
        location: PropTypes.shape({
            lat: PropTypes.number,
            lon: PropTypes.number,
            city: PropTypes.string,
        }).isRequired,
    };

    static defaultProps = {
        location: {
            lat: 0,
            lon: 0,
            city: "",
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            showLocationPanel: false,
        };
    }

    componentDidMount = () => {
        // If city is unset, we ask the user to input their location first (INITIAL LOAD)
        if (!this.props.location.city) {
            this.setState({ showLocationPanel: true });
        }
    };

    render() {
        if (this.state.showLocationPanel) {
            return (
                <LocationPanel togglePanel={() => this.setState({ showLocationPanel: false })} />
            );
        }

        return (
            <MainPanel togglePanel={() => this.setState({ showLocationPanel: true })} />
        );
    }
}


export default WeatherApp;
