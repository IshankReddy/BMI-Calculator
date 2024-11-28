import { UnitSystem } from '../types';

export const calculateBMI = (weight: number, height: number, unitSystem: UnitSystem): number => {
  if (unitSystem === 'metric') {
    // Height in cm to m
    return weight / Math.pow(height / 100, 2);
  } else {
    // Imperial formula: (weight in pounds × 703) / (height in inches)²
    return (weight * 703) / Math.pow(height, 2);
  }
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Underweight':
      return 'text-yellow-600';
    case 'Normal':
      return 'text-green-600';
    case 'Overweight':
      return 'text-orange-600';
    case 'Obese':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export const convertWeight = (weight: number, from: UnitSystem, to: UnitSystem): number => {
  if (from === to) return weight;
  return from === 'metric' ? weight * 2.20462 : weight / 2.20462;
};

export const convertHeight = (height: number, from: UnitSystem, to: UnitSystem): number => {
  if (from === to) return height;
  return from === 'metric' ? height / 2.54 : height * 2.54;
};