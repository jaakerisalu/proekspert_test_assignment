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

const MeasurementToggle = ({ system, setSystem }) => (
    <div className="toggler">
        <input type="checkbox" id="toggle_measurement_system" checked={system === 'c'} readOnly />
        <button className="toggler__body" onClick={() => setSystem(system === 'c' ? 'f' : 'c')}>
            <label className="toggler__slider" htmlFor="toggle_measurement_system">
                <span className="slider__knob" />
                <span className="slider__degrees--c">℃</span>
                <span className="slider__degrees--f">℉</span>
            </label>
        </button>
    </div>
);

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
