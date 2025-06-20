import React from "react";
import truckIcon from "../../assets/bookingIcon.png"

const HowItWorksCard = ({ data }) => {
  return (
    <div className="card bg-base-100 card-md shadow-sm mt-8">
      <div className="card-body">
        <img src={truckIcon} className="w-10" />
        <h2 className="card-title">{data.title}</h2>
        <p>
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
