import { useState } from "react";
import axios from 'axios';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';

const useForecast = () => {
    const [isFailure, setFailure] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getWeather = async (locationId) => {
        const weatherData =  await axios(`${CROSS_DOMAIN}/${BASE_URL}/${locationId}`);
        if(weatherData.status === 200) {
            return weatherData.data;
        } else {
            setFailure(true);
        }
    }

    const getLocationId = async (searchTextLocation) => {
        const response = await axios(`${CROSS_DOMAIN}/${BASE_URL}/search`, {params: { query: searchTextLocation }});
        if(response.data.length > 0){
            const locationData = await response.data;
            if(locationData.length > 0 && locationData){
                return locationData[0].woeid;
            }
        } else {
            setFailure(true);
            return 0;
        }        
    }

    const getWeatherData = async (searchTextLocation, numOfDays) => {
        setLoading(true);
        //Step1: find location id
        const locationId = await getLocationId(searchTextLocation);
        
        //Step2: find weather based on location id
        if(locationId !== 0){
            const weatherData = await getWeather(locationId);
            setLoading(false)
            weatherData.consolidated_weather.length = numOfDays;
            return weatherData.consolidated_weather;
        } else {
            setFailure(true);
            return;
        }
    }

    return {isFailure, isLoading, getWeatherData};
}

export default useForecast;