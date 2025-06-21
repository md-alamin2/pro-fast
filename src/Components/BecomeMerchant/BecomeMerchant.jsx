import React from "react";
import img from "../../assets/location-merchant.png"

const BecomeMerchant = () => {
  return (
    <div className="w-11/12 lg:container bg-[url('./assets/be-a-merchant-bg.png')] bg-no-repeat mx-auto bg-secondary md:py-20 rounded-4xl">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-self-center">
        <img
          src={img}
          className=""
        />
        <div>
          <h1 className="text-4xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-white">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn btn-primary text-black rounded-full mr-4">Become a Merchant</button>
          <button className="btn btn-primary btn-outline rounded-full">Earn with Profast Courier</button>
        </div>
      </div>
    </div>
  );
};

export default BecomeMerchant;
