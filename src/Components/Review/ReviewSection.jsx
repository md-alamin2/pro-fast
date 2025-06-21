import React from "react";
import img from "../../assets/customer-top.png";
import Review from "./Review";

const ReviewSection = () => {
  return (
    <div>
      <img src={img} alt="" className="mx-auto" />
      <h2 className="text-secondary text-4xl font-bold text-center mt-10">
        What our customers are sayings
      </h2>
      <p className="text-center max-w-[660px] mx-auto mt-6">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
      <Review></Review>
    </div>
  );
};

export default ReviewSection;
