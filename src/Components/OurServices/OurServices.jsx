import React, { use } from "react";
import ServicesCard from "../ServicesCard/ServicesCard";

const servicesPromise = fetch("/data/services.json").then(res=>res.json())

const OurServices = () => {
    const servicesData = use(servicesPromise);
  return (
    <div className="bg-secondary w-11/12 lg:container mx-auto py-4 md:py-20 lg:py-50 px-3  lg:px-52 rounded-2xl">
      <div className="text-center text-white">
        <h2 className="text-4xl font-bold">Our Services</h2>
        <p className="max-w-[718px] mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {
            servicesData.map((data, index)=><ServicesCard key={index} data={data}></ServicesCard>)
        }
      </div>
    </div>
  );
};

export default OurServices;
