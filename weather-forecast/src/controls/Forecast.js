import React from 'react';
import PropTypes from 'prop-types';
export default function Forecast({forecastData}) {
    return (
        <div className='row'>
            {forecastData.map(weatherPerDay => {
                <div className='col' key={weatherPerDay.id}>
                    <h6>{weatherPerDay.weather_state_name}</h6>
                    <small>{weatherPerDay.applicable_date}</small>
                    <br/>
                    <img src={require(`../images/${weatherPerDay.weather_state_abbr}.jpg`).default} width="200rem" height="200rem"/>
                </div>
            })}
        </div>
    )
}

Forecast.propTypes = {
    forecastData: PropTypes.array.isRequired
}
