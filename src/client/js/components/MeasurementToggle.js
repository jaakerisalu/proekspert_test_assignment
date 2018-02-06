import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setMeasurementSystem } from "../ducks/weather";

const mapStateToProps = state => ({
    system: state.measurementSystem,
});

const mapDispatchToProps = dispatch => ({
    setSystem: selection => dispatch(setMeasurementSystem(selection)),
});

const MeasurementToggle = ({ system, setSystem }) => {
    return (
        <div className="toggler">
            <input type="checkbox" id="toggle_measurement_system" checked={system === 'c'} readOnly />
            <div className="toggle" onClick={() => setSystem(system === 'c' ? 'f' : 'c')}>
                <label htmlFor="toggle_measurement_system">
                    <i />
                    <span className="c">℃</span>
                    <span className="f">℉</span>
                </label>
            </div>
        </div>
    );
};

MeasurementToggle.propTypes = {
    setSystem: PropTypes.func.isRequired,
    system: PropTypes.oneOf(['f', 'c']),
};

MeasurementToggle.defaultProps = {
    system: 'f',
};

const ToggleConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MeasurementToggle);

export default ToggleConnector;
