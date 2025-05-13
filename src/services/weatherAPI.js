import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'es'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener datos del clima');
  }
};

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'es'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`No se encontró información para ${city}`);
  }
};

export const fetchForecastByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(FORECAST_BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'es'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener pronóstico semanal');
  }
};

export const fetchForecastByCity = async (city) => {
  try {
    const response = await axios.get(FORECAST_BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'es'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`No se encontró pronóstico para ${city}`);
  }
};
