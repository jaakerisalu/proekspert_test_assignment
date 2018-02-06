import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from "./Panel";
import MeasurementToggle from "./MeasurementToggle";

const mapStateToProps = state => ({
    system: state.measurementSystem,
});

@connect(mapStateToProps, null)
class MainPanel extends Component {
    render() {
        return (
            <Panel classes="main">
                <MeasurementToggle />
                <button onClick={(e) => { e.preventDefault(); this.props.togglePanel(); }} className="return">🡠</button>
                <h1>Tallinn</h1>
                <h2>Tuesday, December 6th, 2018</h2>
                <h3>Light snow</h3>
                <i className="wi wi-night-sleet" />
                <div className="huge">
                    39 °{this.props.system === 'c' ? 'C' : 'F'}
                </div>
                <p>Monday</p>
                <p>28 deg</p>
            </Panel>
        );
    }
}

MainPanel.propTypes = {
    system: PropTypes.oneOf(['f', 'c']),
    togglePanel: PropTypes.func.isRequired,
};

MainPanel.defaultProps = {
    system: 'f',
};

export default MainPanel;

