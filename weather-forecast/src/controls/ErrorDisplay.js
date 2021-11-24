import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorDisplay({errorMsg}) {
    return (
        <div className='alert alert-danger'>
            {errorMsg}         
        </div>
    )
}

ErrorDisplay.propTypes = {
    errorMsg : PropTypes.string.isRequired
}