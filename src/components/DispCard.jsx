

import React from "react";
import TimeProgressBar from "./Countdown";

import { masamDescriptions } from "./contstants/masamDescriptions";

const formatDate = (date) => {

  const options = { weekday: 'long' };
  const dayOfWeek = date.toLocaleDateString('en-US', options); // "Friday"
  const month = date.toLocaleString('en-US', { month: 'short' }); // "Aug"
  const day = date.getDate(); // 16
  let hours = date.getHours(); // 21
  const minutes = date.getMinutes().toString().padStart(2, '0'); // "35"
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12 || 12; // Convert to 12-hour format and handle 0 as 12
  
  return `${month} ${day} (${dayOfWeek}), ${hours}:${minutes} ${ampm}`;
};


const formatDate2 = (inputDate) => {

const today = new Date();
const isToday =
  inputDate.getDate() === today.getDate() &&
  inputDate.getMonth() === today.getMonth() &&
  inputDate.getFullYear() === today.getFullYear();

// Format time
let hours = inputDate.getHours();
const minutes = inputDate.getMinutes().toString().padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12; // Convert to 12-hour format and handle 0 as 12

const formattedTime = `${hours}:${minutes} ${ampm}`;

if (isToday) {
    return `${formattedTime} (Today)`;
} else {
  // Determine if it's tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const isTomorrow =
    inputDate.getDate() === tomorrow.getDate() &&
    inputDate.getMonth() === tomorrow.getMonth() &&
    inputDate.getFullYear() === tomorrow.getFullYear();

  if (isTomorrow) {
    return `${formattedTime} (Tomorrow)`;
  } else {
    return `${formattedTime} (Today)`;
  }
}

}

function DispCard({title, start, end, itemName, itemData, nextItem, tagLine}) {
  // Create an instance of the service



  return (
    <div className="card bg-neutral shadow-xl p-6 w-full min-w-[900px]">
    <div className="flex flex-col">
    <div className="text-xl font-bold mb-4 text-left">{title}</div>
      
      <div className="text-md font-medium text-slate-400 mb-4 text-left">{tagLine}</div>
    </div>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2 min-w-[400px]">
      <TimeProgressBar
        startTime={start}
        endTime={end}
        />
      </div>
      <div className="flex flex-col gap-4 text-left justify-center">
        <p className="text-2xl md:text-4xl" style={{color: '#e0c304'}}>{itemName || "Not available"}</p>
        <p className="text-sm md:text-base text-neutral-content">
          {itemData ? itemData[itemName].highlight : '...'}
        </p>
        <p className="text-sm md:text-base font-medium text-slate-400">
          {itemData ? itemData[itemName].description : '...'}
        </p>
        <p className="text-sm md:text-md font-bold text-neutral-content">
          {"Next: " + (nextItem || "...") + '  '}
          <span className=" badge badge-secondary text-xs md:text-md font-bold text-secondary-content">
            {(" from " + formatDate2(end)) || "..."}
          </span>
        </p>
      </div>
    </div>
  </div>
  
  );
}

export default DispCard;
