import React from "react";
import img1 from "../../assets/brands/amazon.png";
import img2 from "../../assets/brands/amazon_vector.png";
import img3 from "../../assets/brands/casio.png";
import img4 from "../../assets/brands/moonstar.png";
import img5 from "../../assets/brands/randstad.png";
import img6 from "../../assets/brands/start-people 1.png";
import img7 from "../../assets/brands/start.png";
import Marquee from "react-fast-marquee";

const ClientMarque = () => {
  const clients = [img1, img2, img3, img4, img5, img6, img7];
  return (
    <div>
        <h3 className="text-2xl text-secondary font-bold text-center mb-10">We've helped thousands of sales teams</h3>
      <Marquee pauseOnHover>
        {clients.map((client, index) => (
          <div key={index} className="mx-24 flex items-center">
            <img src={client} alt="" className="h-6 object-contain" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientMarque;
