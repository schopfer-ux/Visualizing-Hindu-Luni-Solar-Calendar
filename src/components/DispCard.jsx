import React, { useState } from "react";
import TimeProgressBar from "./Countdown";
import { OpenIcon, CloseIcon } from "./contstants/svgIcons";

const formatDate = (date) => {
  const options = { weekday: "long" };
  const dayOfWeek = date.toLocaleDateString("en-US", options);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${month} ${day} (${dayOfWeek}), ${hours}:${minutes} ${ampm}`;
};

export const formatDate2 = (inputDate) => {
  const today = new Date();
  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();

  let hours = inputDate.getHours();
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  if (isToday) {
    return `${formattedTime} (Today)`;
  } else {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow =
      inputDate.getDate() === tomorrow.getDate() &&
      inputDate.getMonth() === tomorrow.getMonth() &&
      inputDate.getFullYear() === tomorrow.getFullYear();

    return isTomorrow ? `${formattedTime} (Tomorrow)` : formattedTime;
  }
};

function DispCard({ title, start, end, itemName, itemData, nextItem }) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="card bg-neutral shadow-xl p-4 w-full max-w-full sm:max-w-md mx-auto">
      <div className="flex flex-col mb-4">
        <span className="badge badge-accent p-3text-md md:text-md font-semibold text-secondary-content">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full shadow-2xl rounded-2xl p-6 ">
          <TimeProgressBar
            startTime={start}
            endTime={end}
            title={itemName || "Not available"}
          />
        </div>
        <div className="flex flex-col gap-2 text-left justify-center w-full">
          <div className="shadow-2xl rounded-3xl p-6 cursor-pointer" onClick={toggleDescription}>
            <div className="flex items-center">
              <p className="text-sm md:text-base text-neutral-content flex-grow">
                {itemData?.[itemName]?.highlight || "..."}
              </p>
              <button
                
                className="text-blue-500 flex items-center justify-center ml-2"
              >
                {isDescriptionVisible ? (
                  <CloseIcon />
                ) : (
                  <OpenIcon />
                )}
              </button>
            </div>

            {isDescriptionVisible && (
              <p className="text-sm md:text-base font-medium text-slate-400 mt-2">
                {itemData?.[itemName]?.description || "..."}
              </p>
            )}
          </div>

          <p className="text-sm md:text-md font-bold text-gray-300">
            
            <span className="text-accent">Next: </span>
            { (nextItem || "...") + "  "}
            <span className="badge badge-accent p-3 text-xs md:text-md font-bold text-secondary-content">
              {" from " + formatDate2(end)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DispCard;
