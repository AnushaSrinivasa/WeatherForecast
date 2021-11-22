import './App.css';
import Form from './controls/Form';
import useForecast from './customHooks/useForecast';

function WeatherForeCast() {

  const {isFailure, isLoading, forecastData} = useForecast();

  return (
    <div className="App container w-50 p-5">
      <Form />
    </div>
  );
}

export default WeatherForeCast;
