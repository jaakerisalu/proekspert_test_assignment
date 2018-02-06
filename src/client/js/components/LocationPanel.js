import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import Panel from "./Panel";

class LocationPanel extends Component {
    static propTypes = {
        ...geoPropTypes,
        // None for now
    };

    setLocation() {
        console.log(`LAT ${this.props.coords.latitude} - LON ${this.props.coords.longitude}`);
    }

    render() {
        console.log(this.props);
        return (
            <Panel classes="main">
                I want your location pls can I have it???
                {   /* I'm a big boy so I can nest all the ternaries I want */
                    !this.props.isGeolocationAvailable ?  // eslint-disable-line no-nested-ternary
                        <div>I&apos;m afraid your browser doesn&apos;t support geolocation</div> :
                        !this.props.isGeolocationEnabled ?  // eslint-disable-line no-nested-ternary
                            <div>I&apos;m afraid you&apos;ve disabled geolocation</div> :
                            this.props.coords ?
                                <div onClick={() => this.setLocation()}>
                                    {`LAT ${this.props.coords.latitude} - LON ${this.props.coords.longitude}`}
                                </div> :
                                <div>Getting your coordinates</div>
                }
            </Panel>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 10000,
})(LocationPanel);

// LocationPanel.propTypes = {
//     // temperatureData: PropTypes.whatever.isRequired,
// };
