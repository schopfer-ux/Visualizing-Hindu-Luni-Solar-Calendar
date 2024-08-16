import "./App.css";
import { CalculatorService } from "./config/calculator.service";

import React from "react";

import { masamDescriptions } from "./components/contstants/masamDescriptions";
import { nakshatraDescriptions } from "./components/contstants/nakshDescriptions";
import DispCard from "./components/DispCard";
import IntroCard from "./components/IntroCard";


function App() {
  // Create an instance of the service
  const calculatorService = new CalculatorService();

  // Example usage
  const date = new Date();
  const panchang = calculatorService.calculate(date);

  const tithiData = masamDescriptions.sravana.find(item => item[panchang.Tithi]);
  
  const NakshData = nakshatraDescriptions.nakshatras.find(item => item[panchang.Nakshatra]);


  return (

<div className="flex flex-col md:flex-row flex-wrap gap-4 p-4 w-full max-w-screen-md mx-auto justify-center items-center min-h-screen">


<IntroCard />

<DispCard 
      title="Tithi" 
      tagLine={" Tithi is a way to measure time based on the Moon's position."}
      start={panchang.Tithi_Start} 
      end={panchang.Tithi_End} 
      itemName={panchang.Tithi} 
      itemData={tithiData} 
      nextItem={panchang.Tithi_Next} 
    />

<DispCard 
      title={"Nakshatra"}
      tagLine={"Nakshatra is like the Moon's address for the night. It tells us which group of stars the Moon is hanging out with."}
      start={panchang.Nakshatra_Start} 
      end={panchang.Nakshatra_End} 
      itemName={panchang.Nakshatra} 
      itemData={NakshData} 
      nextItem={panchang.Nakshatra_Next} 
    />
</div>



  );
}

export default App;
