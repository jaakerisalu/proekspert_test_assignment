import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from "./Panel";
import MeasurementToggle from "./MeasurementToggle";

class MainPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measurementSystem: 'f',
        };
    }

    toggleMeasurementSystem() {
        console.log('TRIGGERED');
        if (this.state.measurementSystem === 'c') {
            this.setState({ measurementSystem: 'f' });
        } else {
            this.setState({ measurementSystem: 'c' });
        }
    }

    render() {
        return (
            <Panel classes="main">
                <MeasurementToggle callback={() => this.toggleMeasurementSystem()} />
                <h1>Tallinn</h1>
                <h2>Tuesday, December 6th, 2018</h2>
                <h3>Light snow</h3>
                <div className="huge">
                    39 °{this.state.measurementSystem === 'c' ? 'C' : 'F'}
                </div>
                <p>Monday</p>
                <p>28 deg</p>
            </Panel>
        );
    }
}

// MainPanel.propTypes = {
//     measurementSystem: PropTypes.string.isRequired,
// };

export default MainPanel;

