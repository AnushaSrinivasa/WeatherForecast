import { useState } from 'react';
import './App.css';
//import DisplayForecast from './controls/DisplayForecast';
import Form from './controls/Form';
import useForecast from './customHooks/useForecast';
import defaultBackground from './images/default.jpg';

function WeatherForeCast() {

  const [forecastData, setForecastdata] = useState([]);
  const {isLoading, getWeatherData} = useForecast();

  const onLocationSearch = async (searchTextLocation, numOfDays) => {
    const weather = await getWeatherData(searchTextLocation, numOfDays);
    console.log(weather);
    if(weather) {
      setForecastdata(weather);
    }     
  }

  return (
    <div className='container App' style={{backgroundImage:`url(${defaultBackground})`, backgroundRepeat: 'no-repeat'}}>
        <div className="p-5 formDiv">
          <Form onLocationSearch={onLocationSearch} />
        </div>
        
        {isLoading ? 
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> :
        <div className='row'>
          {forecastData && forecastData.map(weatherPerDay => {
              return (
                <div className='col' key={weatherPerDay.id}>
                  <h5>{weatherPerDay.weather_state_name}</h5>
                  <small>{weatherPerDay.applicable_date}</small>
                  <br/>
                  <img src={require(`./images/${weatherPerDay.weather_state_abbr}.jpg`).default}/>
                </div>
              )
          })}
        </div> }
    </div>
  );
}

export default WeatherForeCast;
