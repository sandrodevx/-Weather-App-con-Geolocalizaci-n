import { useState } from 'react';
import styles from './CitySearch.module.css'; // 👈 Import correcto

export const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ej: Barcelona, ES"
        className={styles.searchInput}
        required
      />
      <button type="submit" className={styles.searchButton}>
        Buscar
      </button>
    </form>
  );
};