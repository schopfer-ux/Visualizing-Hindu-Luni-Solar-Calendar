import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { CalculatorService } from './config/calculator.service';
import { SunIcon, StarIcon } from './components/contstants/svgIcons'; // Keeping typos as is
import { masamDescriptions } from './components/contstants/masamDescriptions'; // Keeping typos as is
import { nakshatraDescriptions } from './components/contstants/nakshDescriptions'; // Keeping typos as is
import DispCard from './components/DispCard';
import IntroCard from './components/IntroCard';
import DesCard from './components/DesCrad'; // Keeping typos as is
import { formatDate2 } from './components/DispCard';
// import Notification from './notifications/Notification'; // Uncomment if needed

function App() {
  const [tithiNotif, setTithiNotif] = useState("");
  const [panchang, setPanchang] = useState(null);
  const [tithiData, setTithiData] = useState(null);
  const [nakshData, setNakshData] = useState(null);

  useEffect(() => {
    const calculatorService = new CalculatorService();
    const date = new Date();
    const panchangData = calculatorService.calculate(date);
    setPanchang(panchangData);
    setTithiNotif(panchangData.Tithi);
  }, []);

  const sendNotification = useCallback((item) => {
    if ("Notification" in window && Notification.permission === "granted" && panchang) {
      new Notification(`${item} Tithi in Effect`, {
        body: `Ends ${formatDate2(panchang.Tithi_End)}`,
        icon: '/logo.svg',
      });
    }
  }, [panchang]);

  const requestNotificationPermission = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          sendNotification(tithiNotif);
        }
      });
    }
  }, [sendNotification, tithiNotif]);

  useEffect(() => {
    if (panchang) {
      requestNotificationPermission();
    }
  }, [panchang, requestNotificationPermission]);

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
  }, [panchang]);

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
