import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Components/Logo/Logo";
import {
  FaTh,
  FaBoxOpen,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaUserEdit,
  FaUserClock,
  FaUserCheck,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* navbar */}
          <div className="navbar bg-base-300 w-full lg:hidden">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
          </div>
          {/* Page content here */}
          <div>
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <Logo></Logo>
            <li>
              <NavLink to="/dashboard">
                <FaTh className="mr-2" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-parcels">
                <FaBoxOpen className="mr-2" /> My Parcels
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/payment-history">
                <FaMoneyBillWave className="mr-2" /> Payment History
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/track">
                <FaMapMarkedAlt className="mr-2" /> Track Package
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile">
                <FaUserEdit className="mr-2" /> Update Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/pending-riders">
                <FaUserClock className="mr-2" /> Pending Riders
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/active-riders">
                <FaUserCheck className="mr-2" /> Active Riders
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/make-admin">Make Admin</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
