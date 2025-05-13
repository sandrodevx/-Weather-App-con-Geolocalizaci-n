import { useWeather } from './hooks/useWeather';
import { WeatherCard } from './components/WeatherCard';
import { ChartWeather } from './components/ChartWeather';
import { CitySearch } from './components/CitySearch';
import { Loader } from './components/Loader';
import './App.css';

function App() {
  const { 
    weather, 
    forecast, 
    loading, 
    error, 
    getWeatherByCity,
    getWeatherByGeolocation
  } = useWeather();

  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">WeatherApp</h1>
        <p className="app-subtitle">Consulta el clima en cualquier ciudad del mundo</p>
      </header>

      <CitySearch onSearch={getWeatherByCity} />
      
      <button 
        className="button location-button" 
        onClick={getWeatherByGeolocation}
      >
        <LocationIcon />
        Usar mi ubicación
      </button>

      {loading && <Loader />}
      
      {error && <p className="error">{error}</p>}
      
      <div className="weather-content">
        {weather && !loading && <WeatherCard weather={weather} />}
        
        {forecast && forecast.weeklyData && !loading && (
          <ChartWeather weeklyData={forecast.weeklyData} />
        )}
      </div>
    </div>
  );
}

export default App;