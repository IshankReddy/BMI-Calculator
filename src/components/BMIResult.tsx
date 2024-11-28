import React from 'react';
import { getCategoryColor } from '../utils/bmi';
import { Share2, Download, Save } from 'lucide-react';
import { BMIRecord } from '../types';

interface BMIResultProps {
  bmi: number;
  category: string;
  onSave: () => void;
  onShare: () => void;
  onExport: () => void;
}

export default function BMIResult({ bmi, category, onSave, onShare, onExport }: BMIResultProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your BMI Result</h2>
        <p className="text-4xl font-bold mt-2">{bmi.toFixed(1)}</p>
        <p className={`text-xl font-semibold mt-2 ${getCategoryColor(category)}`}>
          {category}
        </p>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-semibold text-gray-600 w-full">
            <div className="flex justify-between">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>
        <div className="flex h-2 mb-4">
          <div className="w-1/4 bg-yellow-400 rounded-l"></div>
          <div className="w-1/4 bg-green-400"></div>
          <div className="w-1/4 bg-orange-400"></div>
          <div className="w-1/4 bg-red-400 rounded-r"></div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>
        <button
          onClick={onShare}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>
    </div>
  );
}