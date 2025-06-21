import React, { use } from "react";

const benefitsPromise = fetch("/data/benefits.json").then((res) => res.json());

const Benefits = () => {
  const benefitsData = use(benefitsPromise);
  return (
    <div className="w-11/12 lg:container mx-auto border-dashed border-t border-b py-20 flex flex-col gap-6">
      {benefitsData.map((benefit) => (
        <div key={benefit.id} className="card bg-base-100 border rounded-2xl p-6 h-full">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-12">
            <img src={benefit.img} className="w-40 mb-4" />
            <div className="md:border-dashed md:border-l md:pl-12 md:py-6">
              <h2 className="card-title text-2xl text-secondary font-bold mb-2">
                {benefit.title}
              </h2>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
