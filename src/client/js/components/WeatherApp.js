import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainPanel from "./MainPanel";
import LocationPanel from "./LocationPanel";

//
// function mapDispatchToProps(dispatch) {
//     // ({
//     //     onLoad: () => { dispatch(fetchPeople()); },
//     //     onSort: (list) => { dispatch(setPeople(list)); },
//     // });
//     return () => {};
// }
//
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
            city: 'Unknown',
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            showLocationPanel: false,
        };
    }

    render() {
        console.log('RENDERING');
        console.log(this.props.location);

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
