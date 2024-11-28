import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BMIRecord } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BMIChartProps {
  records: BMIRecord[];
}

export default function BMIChart({ records }: BMIChartProps) {
  const sortedRecords = [...records].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sortedRecords.map(record => 
      new Date(record.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'BMI',
        data: sortedRecords.map(record => record.bmi),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Normal Range',
        data: sortedRecords.map(() => 18.5),
        borderColor: 'rgba(34, 197, 94, 0.5)',
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: 'Overweight Threshold',
        data: sortedRecords.map(() => 25),
        borderColor: 'rgba(234, 179, 8, 0.5)',
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'BMI History Chart',
      },
    },
    scales: {
      y: {
        min: Math.min(16, ...sortedRecords.map(r => r.bmi)) - 1,
        max: Math.max(35, ...sortedRecords.map(r => r.bmi)) + 1,
      },
    },
  };

  return (
    <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow-lg">
      {records.length > 0 ? (
        <Line options={options} data={data} />
      ) : (
        <p className="text-center text-gray-500 py-8">
          No data available for chart visualization
        </p>
      )}
    </div>
  );
}