import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Panel from "./Panel";
import { setCoordinatesWithCity } from "../ducks/weather";

const mapDispatchToProps = dispatch => ({
    setCoords: (lat, lon) => dispatch(setCoordinatesWithCity(lat, lon)),
});

@connect(null, mapDispatchToProps)
class LocationPanel extends Component {
    static propTypes = {
        ...geoPropTypes,
        togglePanel: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { address: '', error: '' };
    }

    setGeoLocation() {
        this.props.setCoords(this.props.coords.latitude, this.props.coords.longitude).then(
            this.props.togglePanel(),
        );
    }

    setGooglePlacesLocation = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then((latLng) => {
                this.setState({ error: '' });
                this.props.setCoords(latLng.lat, latLng.lng).then(
                    this.props.togglePanel(),
                );
            })
            .catch(error => this.setState({ error }));
    };

    handleGooglePlacesChange = (address) => {
        this.setState({ address });
    };

    render() {
        return (
            <Panel classes="location">
                {this.state.error ?
                    <div className="places-error">
                        Unable to get coordinates, try a different place
                    </div> : null
                }
                <PlacesAutocomplete
                    inputProps={{
                        value: this.state.address,
                        onChange: this.handleGooglePlacesChange,
                        placeholder: 'City',
                    }}
                    onSelect={address => this.setGooglePlacesLocation(address)}
                    classNames={{
                        root: 'google-autocomplete',
                        input: 'places-input',
                    }}
                />
                <div>or</div>
                <div className="geolocation">
                    {
                        !this.props.isGeolocationAvailable ?
                            <div>I&apos;m afraid your browser doesn&apos;t support geolocation</div> :
                            !this.props.isGeolocationEnabled ?
                                <div>I&apos;m afraid you&apos;ve disabled geolocation</div> :
                                this.props.coords ?
                                    <div className="use-geolocation">
                                        use my <span onClick={() => this.setGeoLocation()}>current position</span>
                                    </div> :
                                    <div className="use-geolocation">
                                        use my <span className="disabled">current position</span>
                                        <div className="geo-error">(Unable to get your position)</div>
                                    </div>
                    }
                </div>
            </Panel>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 10000, // Wait 10 sec before defaulting to NOPE
})(LocationPanel);
