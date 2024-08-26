import React from 'react'

const DesCard = ({
  tagLine, title, icon}) => {
    
  const lastUpdated = ((new Date().getHours()%12).toString().padStart(2, '0')) + ":" + (new Date().getMinutes().toString().padStart(2, '0')) + " " + (new Date().getHours() >= 12 ? 'PM' : 'AM');

  const options = { weekday: 'long' };
  const dayOfWeek = new Date().toLocaleDateString('en-US', options);
  return (
    <div className="hidden md:block card bg-secondary-content shadow-xl p-6 w-full max-w-full sm:max-w-md mx-auto">
    <div className="flex flex-col mb-4">
    <div className="text-xl font-bold mb-2 text-left text-secondary">{icon}{title} </div>
      <div className="text-md font-normal text-slate-100 mb-4 text-left">
        {tagLine}
      </div>
    </div>
  </div>
  
  )
}

export default DesCard