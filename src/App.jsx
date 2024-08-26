import "./App.css";
import { CalculatorService } from "./config/calculator.service";
import { SunIcon, StarIcon, AtomIcon } from "./components/contstants/svgIcons";

import React from "react";

import { masamDescriptions } from "./components/contstants/masamDescriptions";
import { nakshatraDescriptions } from "./components/contstants/nakshDescriptions";
import DispCard from "./components/DispCard";
import IntroCard from "./components/IntroCard";
import DesCard from "./components/DesCrad";

function App() {
  // Create an instance of the service
  const calculatorService = new CalculatorService();

  // Example usage
  const date = new Date();
  const panchang = calculatorService.calculate(date);

  const tithiData = masamDescriptions.sravana.find(
    (item) => item[panchang.Tithi]
  );

  const NakshData = nakshatraDescriptions.nakshatras.find(
    (item) => item[panchang.Nakshatra]
  );

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
              itemData={NakshData}
              nextItem={panchang.Nakshatra_Next}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
