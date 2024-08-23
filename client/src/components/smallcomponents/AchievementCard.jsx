import React from 'react'

const AchievementCard = ({ numbers, title }) => {
  //min-w-[200px]
    return (
      <div className="flex-1 p-5 xl:p-6 rounded-md border-1 bordder-solid bg-Purple-6 border-Grey-60">
        <div>
          <h2 className="text-[24px] sm:text-[30px] md:text-[40px] font-bold">{`${
            numbers > 1000 ? numbers / 1000 + "K" : numbers + "+"
          }`}</h2>
        </div>
        <p className="text-[14px] sm:text[16px] lg:text[18px]">{title}</p>
      </div>
    );
  };

export default AchievementCard