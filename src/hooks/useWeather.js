import { useState, useEffect, useCallback } from 'react';
import { 
  fetchWeatherByCoords, 
  fetchWeatherByCity, 
  fetchForecastByCoords, 
  fetchForecastByCity 
} from '../services/weatherAPI';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processWeeklyData = (forecastData) => {
    // Extract daily temperature at noon for the next 7 days
    const dailyTemps = [];
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const todayTime = today.getTime();
    
    // Group by day and get temp at ~12:00
    const dailyForecasts = forecastData.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString();
      
      // Get forecast closest to noon for each day
      if (!acc[day] || Math.abs(date.getTime() - (new Date(day).getTime() + 12 * 3600 * 1000)) < 
          Math.abs(new Date(acc[day].dt * 1000).getTime() - (new Date(day).getTime() + 12 * 3600 * 1000))) {
        acc[day] = item;
      }
      
      return acc;
    }, {});
    
    // Convert to array and sort by date
    Object.values(dailyForecasts)
      .sort((a, b) => a.dt - b.dt)
      .slice(0, 7)
      .forEach(item => {
        dailyTemps.push(Math.round(item.main.temp));
      });
    
    return dailyTemps;
  };

  const getWeatherByGeolocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const [weatherData, forecastData] = await Promise.all([
                fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
                fetchForecastByCoords(position.coords.latitude, position.coords.longitude)
              ]);
              
              setWeather(weatherData);
              setForecast({
                ...forecastData,
                weeklyData: processWeeklyData(forecastData)
              });
              setLoading(false);
            } catch (err) {
              setError('Error al cargar datos del clima');
              setLoading(false);
            }
          },
          (err) => {
            setError('Debes permitir la geolocalización');
            setLoading(false);
          }
        );
      } else {
        setError('Tu navegador no soporta geolocalización');
        setLoading(false);
      }
    } catch (err) {
      setError('Error al cargar el clima');
      setLoading(false);
    }
  }, []);

  const getWeatherByCity = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city)
      ]);
      
      setWeather(weatherData);
      setForecast({
        ...forecastData,
        weeklyData: processWeeklyData(forecastData)
      });
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Error al buscar la ciudad');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWeatherByGeolocation();
  }, [getWeatherByGeolocation]);

  return { 
    weather, 
    forecast, 
    loading, 
    error, 
    getWeatherByCity,
    getWeatherByGeolocation
  };
};