import { useState } from 'react';
import './WeatherForeCast.css';
import ErrorDisplay from './controls/ErrorDisplay';
import Form from './controls/Form';
import useForecast from './customHooks/useForecast';
import defaultBackground from './images/default.jpg';
import Loading from './controls/Loading';
import Forecast from './controls/Forecast';

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

  /**
   * Resetting the form and clearing results
   */
  const resetResults = () => {
    setLocationDetails("");
    setForecastdata([]);
    setStyle("");
  }

  return (
    <div className='App' style={{backgroundImage:`url(${defaultBackground})`}}>
        {/* error message */}
        {!formValidation && <ErrorDisplay errorMsg={formErrorMsg}/>}

        {/* Form */}
        <div className="p-5 formDiv">
          <Form onLocationSearch={onLocationSearch} setFormValidation={setFormValidation} setFormErrorMsg={setFormErrorMsg}
            resetResults={resetResults}/>
        </div>

        {/* Results */}
        {isLoading ? <Loading /> :
        <div className='p-4'>
          {locationDetails && <h5>{`Displaying results for ${locationDetails}`}</h5>}
           {forecastData && 
           <div className={style}>
                <Forecast forecastData={forecastData} />
           </div>}
        </div>}
    </div>
  );
}

export default WeatherForeCast;
