import styles from './WeatherCard.module.css';

export const WeatherCard = ({ weather }) => {
  if (!weather) return null;
  
  const formatDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className={styles.weatherCard}>
      <h2 className={styles.location}>{weather.name}, {weather.sys.country}</h2>
      <p className={styles.date}>{formatDate()}</p>
      
      <div className={styles.tempContainer}>
        <div className={styles.temp}>{Math.round(weather.main.temp)}°C</div>
      </div>
      
      <div className={styles.weatherInfo}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p className={styles.weatherDescription}>{weather.weather[0].description}</p>
      </div>
      
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Sensación</span>
          <span className={styles.detailValue}>{Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Humedad</span>
          <span className={styles.detailValue}>{weather.main.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Viento</span>
          <span className={styles.detailValue}>{Math.round(weather.wind.speed * 3.6)} km/h</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Presión</span>
          <span className={styles.detailValue}>{weather.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};