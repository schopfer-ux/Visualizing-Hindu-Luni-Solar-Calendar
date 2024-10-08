import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'tailwindcss/tailwind.css';

const TimeProgressBar = ({ startTime, endTime, title }) => {
  const [percentage, setPercentage] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);


      if (now < start) {
        setPercentage(0);
      } else if (now > end) {
        setPercentage(100);
      } else {
        const totalDuration = end - start;
        const elapsedTime = now - start;
        const percentageElapsed = (elapsedTime / totalDuration) * 100;
        setPercentage(percentageElapsed);
      }
      
      const remainingTime = end - now;

      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60)); // Convert ms to hours
      const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); // Convert remainder to minutes
      setHrs(remainingHours);
      setMins(remainingMinutes);


    };

    calculatePercentage();
    const interval = setInterval(calculatePercentage, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <div className='flex justify-center w-full'>
      <div className="relative w-full">
    <CircularProgressbar
      value={percentage}
      styles={buildStyles({
        pathColor: '#b29b03',
        trailColor: '#d6d6d6',
      })}
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
    <p className="text-2xl md:text-3xl lg:text-4xl" style={{ color: "#e0c304" }}>
        {title}
        
      </p>
      <div className="text-md sm:text-md text-gray-500 font-bold">ends in</div>
      <div className="text-2xl sm:text-4xl">{hrs}h : {mins}m</div>
    </div>
  </div>
    </div>
  
  );
};

export default TimeProgressBar;


export const calculateProgress = (startTimer, endTimer) => {
  const now = new Date();
  const start = new Date(startTimer);
  const end = new Date(endTimer);
  let progress = 0;

  if (now < start) {
    progress = 0;
  } else if (now > end) {
    progress = 100;
  } else {
    const totalDuration = end - start;
    const elapsedTime = now - start;
    progress = (elapsedTime / totalDuration) * 100;
  }
  
  const remainingTime = end - now;

  const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60)); // Convert ms to hours
  const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); // Convert remainder to minutes
  
  progress = progress.toFixed(2);

  return {progress, remainingHours, remainingMinutes}

};