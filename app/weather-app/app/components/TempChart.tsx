import React from 'react';
import { Line } from 'react-chartjs-2';

const TempChart = () => {
  const data = {
    labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [22, 21, 20, 19, 18, 17, 16],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TempChart;