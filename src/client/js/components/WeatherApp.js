import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainPanel from "./MainPanel";
import LocationPanel from "./LocationPanel";

// const mapStateToProps = () => {};
//
// function mapDispatchToProps(dispatch) {
//     // ({
//     //     onLoad: () => { dispatch(fetchPeople()); },
//     //     onSort: (list) => { dispatch(setPeople(list)); },
//     // });
//     return () => {};
// }
//
// @connect(mapStateToProps, mapDispatchToProps)
class WeatherApp extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {
            showLocationPanel: false,
        };
    }

    render() {
        if (this.state.showLocationPanel) {
            return (
                <LocationPanel />
            );
        }

        return (
            <MainPanel />
        );
    }
}


export default WeatherApp;
