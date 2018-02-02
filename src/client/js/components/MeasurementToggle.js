import React from 'react';
import PropTypes from 'prop-types';

const MeasurementToggle = ({ callback }) => {
    return (
        <div className="toggler">
            <input type="checkbox" id="toggle_measurement_system" />
            <div className="toggle" onClick={() => callback()}>
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
    callback: PropTypes.func.isRequired,
};

export default MeasurementToggle;
