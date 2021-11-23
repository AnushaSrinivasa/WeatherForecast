import { useState } from 'react';
import './App.css';
//import DisplayForecast from './controls/DisplayForecast';
import Form from './controls/Form';
import useForecast from './customHooks/useForecast';
import defaultBackground from './images/default.jpg';

function WeatherForeCast() {

  const [forecastData, setForecastdata] = useState([]);
  const {isLoading, getWeatherData} = useForecast();
  const [locationDetails, setLocationDetails] = useState("");

  /**
   * On click of search, this function will call getWeatherData from customHooks to get API data
   * @param {String} searchTextLocation 
   * @param {Number} numOfDays 
   */
  const onLocationSearch = async (searchTextLocation, numOfDays) => {
    const weather = await getWeatherData(searchTextLocation, numOfDays);
    if(weather) {
      setLocationDetails(weather.title);
      setForecastdata(weather.consolidated_weather);
    }     
  }

  return (
    <div className='App' style={{backgroundImage:`url(${defaultBackground})`, backgroundRepeat: 'no-repeat'}}>
        <div className="p-5 formDiv">
          <Form onLocationSearch={onLocationSearch} />
        </div>
        
        {isLoading ? 
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> :
        <div className='border p-4'>
            {locationDetails && <h5>{`Displaying results for ${locationDetails}`}</h5>}
            <div className='row'>
            {forecastData && forecastData.map(weatherPerDay => {
                return (
                  <div className='col' key={weatherPerDay.id}>
                    <h6>{weatherPerDay.weather_state_name}</h6>
                    <small>{weatherPerDay.applicable_date}</small>
                    <br/>
                    <img src={require(`./images/${weatherPerDay.weather_state_abbr}.jpg`).default}/>
                  </div>
                )
            })}
          </div>
        </div> }
    </div>
  );
}

export default WeatherForeCast;
