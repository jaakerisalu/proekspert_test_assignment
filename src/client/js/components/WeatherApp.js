import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from "./Panel";

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
            measurementSystem: 'c',
        };
    }

    render() {
        return (
            <Panel classes="main">
                Hello world!
            </Panel>
        );
    }
}


export default WeatherApp;
