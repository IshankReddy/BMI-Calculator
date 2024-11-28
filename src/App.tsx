import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import BMIForm from './components/BMIForm';
import BMIResult from './components/BMIResult';
import BMIHistory from './components/BMIHistory';
import { calculateBMI, getBMICategory } from './utils/bmi';
import { saveRecord, getRecords, clearRecords, exportToCSV } from './utils/storage';
import { UnitSystem, Gender, BMIRecord } from './types';

function App() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<Gender>('other');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [bmi, setBMI] = useState<number | null>(null);
  const [records, setRecords] = useState<BMIRecord[]>([]);

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  const handleCalculate = () => {
    const calculatedBMI = calculateBMI(weight, height, unitSystem);
    setBMI(calculatedBMI);
  };

  const handleSave = () => {
    if (bmi !== null) {
      const record: BMIRecord = {
        date: new Date().toISOString(),
        bmi,
        weight,
        height,
        unitSystem,
        category: getBMICategory(bmi)
      };
      saveRecord(record);
      setRecords(getRecords());
    }
  };

  const handleShare = async () => {
    if (bmi !== null) {
      const text = `My BMI is ${bmi.toFixed(1)} (${getBMICategory(bmi)})`;
      
      try {
        if (navigator.share && navigator.canShare) {
          const shareData = {
            title: 'My BMI Result',
            text,
            url: window.location.href
          };

          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        }
        // Fallback to clipboard
        await navigator.clipboard.writeText(text);
        alert('Result copied to clipboard!');
      } catch (error) {
        console.error('Error sharing:', error);
        try {
          // Second fallback: try clipboard if sharing failed
          await navigator.clipboard.writeText(text);
          alert('Result copied to clipboard!');
        } catch (clipboardError) {
          console.error('Clipboard error:', clipboardError);
          alert('Could not share or copy result. Please try again.');
        }
      }
    }
  };

  const handleClearHistory = () => {
    clearRecords();
    setRecords([]);
  };

  const handleExport = () => {
    exportToCSV(records);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Activity className="w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold">BMI Calculator</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <BMIForm
            weight={weight}
            height={height}
            age={age}
            gender={gender}
            unitSystem={unitSystem}
            activityLevel={activityLevel}
            onWeightChange={setWeight}
            onHeightChange={setHeight}
            onAgeChange={setAge}
            onGenderChange={setGender}
            onUnitSystemChange={setUnitSystem}
            onActivityLevelChange={setActivityLevel}
            onCalculate={handleCalculate}
          />

          {bmi !== null && (
            <BMIResult
              bmi={bmi}
              category={getBMICategory(bmi)}
              onSave={handleSave}
              onShare={handleShare}
              onExport={handleExport}
            />
          )}

          <BMIHistory
            records={records}
            onClear={handleClearHistory}
          />
        </div>
      </main>
    </div>
  );
}

export default App;