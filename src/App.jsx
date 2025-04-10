import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { CalculatorService } from './config/calculator.service';
import { SunIcon, StarIcon } from './components/contstants/svgIcons';
import { masamDescriptions } from './components/contstants/masamDescriptions';
import { nakshatraDescriptions } from './components/contstants/nakshDescriptions';
import DispCard from './components/DispCard';
import IntroCard from './components/IntroCard';
import DesCard from './components/DesCrad';
import { formatDate2 } from './components/DispCard';

function App() {
  const [panchang, setPanchang] = useState(null);
  const [tithiData, setTithiData] = useState(null);
  const [nakshData, setNakshData] = useState(null);

  // Memoizing the calculator logic to ensure it doesn't run unnecessarily
  const calculatePanchang = useCallback(() => {
    const calculatorService = new CalculatorService();
    const date = new Date();  // Keeping the date inside the function
    return calculatorService.calculate(date);
  }, []);

  // This useEffect will only run once when the component mounts
  useEffect(() => {
    const panchangData = calculatePanchang();
    setPanchang(panchangData);
  }, [calculatePanchang]); // Dependencies array ensures this runs only once

  useEffect(() => {
    if (panchang) {
      const foundTithiData = masamDescriptions.sravana.find(
        (item) => item[panchang.Tithi]
      );
      const foundNakshData = nakshatraDescriptions.nakshatras.find(
        (item) => item[panchang.Nakshatra]
      );
      setTithiData(foundTithiData);
      setNakshData(foundNakshData);
    }
  }, [panchang]); // Runs only when panchang is updated

  if (!panchang) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <div className="flex flex-col md:flex-row w-full mx-0 p-4 gap-4 bg-slate-900 rounded-box">
        <h1 className="text-3xl font-bold">Panchang Pal</h1>
      </div>

      <div className="flex flex-col md:flex-row w-full mx-auto min-h-screen gap-4">
        <div className="w-full md:w-1/5 flex flex-col gap-4">
          <IntroCard />
          <DesCard
            title={"Nakshatra"}
            icon={<StarIcon />}
            tagLine={
              "Nakshatra is like the Moon's address for the night. It tells us which group of stars the Moon is hanging out with."
            }
          />
          <DesCard
            title={"Tithi"}
            icon={<SunIcon />}
            tagLine={
              "Tithi is a way to measure time based on the Moon's position."
            }
          />
        </div>

        <div className="w-full md:w-4/5">
          <div className="grid grid-cols-1 align-start md:grid-cols-2 gap-4 w-full max-w-screen-md">
            <DispCard
              title={"Tithi"}
              start={panchang.Tithi_Start}
              end={panchang.Tithi_End}
              itemName={panchang.Tithi}
              itemData={tithiData}
              nextItem={panchang.Tithi_Next}
            />
            <DispCard
              title="Nakshatra"
              start={panchang.Nakshatra_Start}
              end={panchang.Nakshatra_End}
              itemName={panchang.Nakshatra}
              itemData={nakshData}
              nextItem={panchang.Nakshatra_Next}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;