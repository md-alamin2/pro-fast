import React from "react";
import { Outlet } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import img from "../../../assets/authImage.png";

const Authentication = () => {
  return (
    <div className="bg-[#FAFDF0] bg-cover min-h-screen">
      <div className="flex flex-col lg:flex-row-reverse justify-between">
        <div className="w-1/2">
          <img src={img} className="flex justify-center items-center ml-13 mt-65" />
        </div>
        <div className="w-1/2 h-screen bg-white ">
          <div className="ml-13 mt-11">
            <Logo></Logo>
          </div>
          <div className="flex justify-center items-center">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
