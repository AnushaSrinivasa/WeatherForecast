import { useState } from "react";
import axios from 'axios';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';

const useForecast = () => {
    const [isFailure, setFailure] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecastData, setForecastdata] = useState(null);
    let location = "vancouver";

    const submitRequest = async (location) => {
        //Step1: Get WOEID
        const response = await axios(`${CROSS_DOMAIN}/${BASE_URL}/search`, {params: { query: location }});
        if(response.status === 200){
            //const locationData = await response.data;
            console.log({response})
        }
        //Step2: Get weather
        
    }

    submitRequest(location);

    return {isFailure, isLoading, forecastData};
}

export default useForecast;