import React from "react";

const ServicesCard = ({ data }) => {
  return (
    <div className="bg-base-100 py-4 md:py-8 px-3 md:px-7 rounded-2xl hover:bg-primary transition-all duration-300">
      <img
        src={data.icon}
        className="max-w-20 mx-auto p-2 bg-gradient-to-b from-base-300 from-60% shadow-2xl rounded-full"
      />
      <div className="text-center mt-4">
        <h3 className="text-2xl text-secondary font-bold">{data.title}</h3>
        <p className="font-medium mt-4">{data.description}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
