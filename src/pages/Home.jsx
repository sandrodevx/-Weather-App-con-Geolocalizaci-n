import { useState } from 'react'; // 👈 ¡Import faltante!
import { useWeather } from '../hooks/useWeather';
import { WeatherCard } from '../components/WeatherCard';
import { Loader } from '../components/Loader';
import { CitySearch } from '../components/CitySearch';

export const Home = () => {
  const [manualCity, setManualCity] = useState(null); // 👈 Necesita el import
  const { weather, loading, error } = useWeather(manualCity);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.container}>
      <h1>Clima Actual</h1>
      <CitySearch onSearch={setManualCity} />
      {weather && <WeatherCard weather={weather} />}
    </main>
  );
};