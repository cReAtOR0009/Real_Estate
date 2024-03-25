import React from 'react'

const OffersCard = ({ offer, icon, icon2 }) => {
    return (
      <div className="headerSection2Card">
        <div>
          <img src={icon} alt="" />
        </div>
        <p>{offer}</p>
        <img src={icon2} alt="" />
      </div>
    );
  };

export default OffersCard