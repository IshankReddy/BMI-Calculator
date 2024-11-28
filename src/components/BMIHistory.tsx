import React from 'react';
import { BMIRecord } from '../types';
import { Trash2 } from 'lucide-react';
import BMIChart from './BMIChart';

interface BMIHistoryProps {
  records: BMIRecord[];
  onClear: () => void;
}

export default function BMIHistory({ records, onClear }: BMIHistoryProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">BMI History</h2>
        {records.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear History
          </button>
        )}
      </div>

      <BMIChart records={records} />
      
      {records.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">No history available</p>
      ) : (
        <div className="space-y-2 mt-6">
          {records.map((record, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">BMI: {record.bmi.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  record.category === 'Normal' ? 'bg-green-100 text-green-800' :
                  record.category === 'Underweight' ? 'bg-yellow-100 text-yellow-800' :
                  record.category === 'Overweight' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {record.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}