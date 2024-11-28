import { BMIRecord } from '../types';

export const saveRecord = (record: BMIRecord): void => {
  const records = getRecords();
  records.push(record);
  localStorage.setItem('bmiRecords', JSON.stringify(records));
};

export const getRecords = (): BMIRecord[] => {
  const records = localStorage.getItem('bmiRecords');
  return records ? JSON.parse(records) : [];
};

export const clearRecords = (): void => {
  localStorage.removeItem('bmiRecords');
};

export const exportToCSV = (records: BMIRecord[]): void => {
  const headers = ['Date', 'BMI', 'Weight', 'Height', 'Unit System', 'Category'];
  const csvContent = [
    headers.join(','),
    ...records.map(record => 
      [record.date, record.bmi, record.weight, record.height, record.unitSystem, record.category].join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'bmi-history.csv';
  link.click();
};