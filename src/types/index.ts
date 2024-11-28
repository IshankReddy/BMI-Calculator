export type UnitSystem = 'metric' | 'imperial';
export type Gender = 'male' | 'female' | 'other';

export interface BMIRecord {
  date: string;
  bmi: number;
  weight: number;
  height: number;
  unitSystem: UnitSystem;
  category: string;
}

export interface UserData {
  age?: number;
  gender?: Gender;
  activityLevel?: string;
}