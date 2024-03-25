import React from 'react'

const AchievementCard = ({ numbers, title }) => {
    return (
      <div className="achievementsCard">
        <div>
          <h2 className="fontWeight2">{`${
            numbers > 1000 ? numbers / 1000 + "K" : numbers + "+"
          }`}</h2>
        </div>
        <p className="greyText smallText2">{title}</p>
      </div>
    );
  };

export default AchievementCard