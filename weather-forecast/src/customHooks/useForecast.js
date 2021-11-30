import { useState } from "react";
import axios from 'axios';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';

const useForecast = () => {
    /**
     * Fuction gets weather based on location id
     * @param {number} locationId 
     * @returns weather object
     */
    const getWeather = async (locationId) => {
        const weatherData =  await axios(`${CROSS_DOMAIN}/${BASE_URL}/${locationId}`);
        if(weatherData.status === 200) {
            return weatherData.data;
        }
        return;
    }

    /**
     * Function search location id needed by API
     * @param {String} searchTextLocation 
     * @returns location id
     */
    const getLocationId = async (searchTextLocation) => {
        const response = await axios(`${CROSS_DOMAIN}/${BASE_URL}/search`, {params: { query: searchTextLocation }});
        if(response.data.length > 0){
            const locationData = await response.data;
            if(locationData.length > 0 && locationData){
                return locationData[0].woeid;
            }
        } 
        return 0;       
    }

    /**
     * Function gets location id to get weather based on searched location
     * @param {String} searchTextLocation 
     * @param {Number} numOfDays 
     * @returns weather arry
     */
    const getWeatherData = async (searchTextLocation, numOfDays) => {
        //Step1: find location id
        const locationId = await getLocationId(searchTextLocation);
        
        //Step2: find weather based on location id
        if(locationId !== 0){
            const weatherData = await getWeather(locationId);
            if(weatherData){
                weatherData.consolidated_weather.length = numOfDays;
                return weatherData;
            }
            return;
        } 
        return;
    }

    return {getWeatherData};
}

export default useForecast;