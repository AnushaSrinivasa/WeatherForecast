import { useState } from 'react';
import './WeatherForeCast.css';
import ErrorDisplay from './controls/ErrorDisplay';
import Form from './controls/Form';
import useForecast from './customHooks/useForecast';
import defaultBackground from './images/default.jpg';

function WeatherForeCast() {

  const [forecastData, setForecastdata] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const {getWeatherData} = useForecast();
  const [locationDetails, setLocationDetails] = useState("");
  const [formValidation, setFormValidation] = useState(true);
  const [formErrorMsg, setFormErrorMsg] = useState("");
  const [style, setStyle] = useState("");

  /**
   * On click of search, this function will call getWeatherData from customHooks to get API data
   * @param {String} searchTextLocation 
   * @param {Number} numOfDays 
   */
  const onLocationSearch = async (searchTextLocation, numOfDays) => {
    setLoading(true);
    const weather = await getWeatherData(searchTextLocation, numOfDays);
    if(weather) {
      setLoading(false);
      setStyle("p-4 rounded shadow bg-white")
      setLocationDetails(weather.title);
      setForecastdata(weather.consolidated_weather);
    } else {
      setLoading(false);
      setStyle("");
      setFormValidation(false);
      setFormErrorMsg("Please enter valid location!")
    }
  }

  const resetResults = () => {
    setLocationDetails("");
    setForecastdata([]);
    setStyle("");
  }

  return (
    <div className='App' style={{backgroundImage:`url(${defaultBackground})`}}>

        {!formValidation && <ErrorDisplay errorMsg={formErrorMsg}/>}

        <div className="p-5 formDiv">
          <Form onLocationSearch={onLocationSearch} setFormValidation={setFormValidation} setFormErrorMsg={setFormErrorMsg}
            resetResults={resetResults}/>
        </div>
        
        {isLoading ? 
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> :
        <div className='p-4'>
          {locationDetails && <h5>{`Displaying results for ${locationDetails}`}</h5>}
           {forecastData && <div className={style}>
                <div className='row'>
                  {forecastData && forecastData.map(weatherPerDay => {
                      return (
                        <div className='col' key={weatherPerDay.id}>
                          <h6>{weatherPerDay.weather_state_name}</h6>
                          <small>{weatherPerDay.applicable_date}</small>
                          <br/>
                          <img src={require(`./images/${weatherPerDay.weather_state_abbr}.jpg`).default} width="200rem" height="200rem"/>
                        </div>
                      )
                  })}
              </div>
           </div>}
        </div>}
    </div>
  );
}

export default WeatherForeCast;
