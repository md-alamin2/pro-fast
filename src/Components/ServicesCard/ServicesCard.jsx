import React from "react";

const ServicesCard = ({ data }) => {
  return (
    <div className="bg-base-100 py-8 px-7 rounded-2xl hover:bg-[#CAEB66]">
      <img
        src={data.icon}
        className="max-w-20 mx-auto p-2 bg-[#CAEB66] rounded-full"
      />
      <div className="text-center mt-4">
        <h className="text-2xl font-bold">{data.title}</h>
        <p className="font-medium mt-4">{data.description}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
