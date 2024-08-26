import React from 'react'

const IntroCard = () => {
    
  const lastUpdated = ((new Date().getHours()%12).toString().padStart(2, '0')) + ":" + (new Date().getMinutes().toString().padStart(2, '0')) + " " + (new Date().getHours() >= 12 ? 'PM' : 'AM');

  const options = { weekday: 'long' };
  const dayOfWeek = new Date().toLocaleDateString('en-US', options); // "Friday"
  return (
    <div className="card bg-slate-800 shadow-xl p-6 w-full max-w-full sm:max-w-md mx-auto">
    <div className="flex flex-col mb-4">
      <div className="text-md font-medium text-slate-400 mb-4 text-left">
        {new Date().toLocaleDateString()} - <span className="text-neutral-content">{lastUpdated}</span>
      </div>
      <div className="flex flex-col gap-4 text-left justify-center w-full">
        <p className="text-2xl md:text-4xl font-bold text-slate-300">{dayOfWeek || "Not available"}</p>
      </div>
    </div>
  </div>
  
  )
}

export default IntroCard