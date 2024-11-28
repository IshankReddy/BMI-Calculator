import React from 'react';
import { UnitSystem, Gender } from '../types';
import { Activity, Weight, Ruler, User } from 'lucide-react';

interface BMIFormProps {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  unitSystem: UnitSystem;
  activityLevel: string;
  onWeightChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onAgeChange: (value: number) => void;
  onGenderChange: (value: Gender) => void;
  onUnitSystemChange: (value: UnitSystem) => void;
  onActivityLevelChange: (value: string) => void;
  onCalculate: () => void;
}

export default function BMIForm({
  weight,
  height,
  age,
  gender,
  unitSystem,
  activityLevel,
  onWeightChange,
  onHeightChange,
  onAgeChange,
  onGenderChange,
  onUnitSystemChange,
  onActivityLevelChange,
  onCalculate,
}: BMIFormProps) {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            unitSystem === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onUnitSystemChange('metric')}
        >
          Metric
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            unitSystem === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onUnitSystemChange('imperial')}
        >
          Imperial
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Weight className="w-6 h-6 text-gray-400" />
          <input
            type="number"
            value={weight}
            onChange={(e) => onWeightChange(Number(e.target.value))}
            placeholder={`Weight (${unitSystem === 'metric' ? 'kg' : 'lbs'})`}
            className="flex-1 p-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Ruler className="w-6 h-6 text-gray-400" />
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            placeholder={`Height (${unitSystem === 'metric' ? 'cm' : 'inches'})`}
            className="flex-1 p-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center space-x-4">
          <User className="w-6 h-6 text-gray-400" />
          <input
            type="number"
            value={age}
            onChange={(e) => onAgeChange(Number(e.target.value))}
            placeholder="Age"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Activity className="w-6 h-6 text-gray-400" />
          <select
            value={activityLevel}
            onChange={(e) => onActivityLevelChange(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="very">Very Active</option>
          </select>
        </div>

        <div className="flex justify-center space-x-4">
          {(['male', 'female', 'other'] as Gender[]).map((g) => (
            <button
              key={g}
              className={`px-4 py-2 rounded-lg ${
                gender === g ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => onGenderChange(g)}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onCalculate}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Calculate BMI
      </button>
    </div>
  );
}