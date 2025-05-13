import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './ChartWeather.module.css';

Chart.register(...registerables);

export const ChartWeather = ({ weeklyData }) => {
  const data = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Temperatura (°C)',
      data: weeklyData,
      borderColor: '#3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  return (
    <div className={styles.chartContainer}>
      <h3>Pronóstico Semanal</h3>
      <Line data={data} />
    </div>
  );
};