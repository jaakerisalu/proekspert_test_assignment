import React from 'react';
import PropTypes from 'prop-types';

export default function Panel({ children, classes }) {
    return (
        <div className={`panel ${classes}`}>
            {children}
        </div>
    );
}

Panel.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(React.PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    classes: PropTypes.string.isRequired,
};
