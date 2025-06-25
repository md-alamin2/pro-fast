import React from "react";
import { Link, NavLink } from "react-router";
import { MdOutlineLogout } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold bg-primary" : "font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive ? "font-semibold bg-primary" : "font-medium"
          }
        >
          Coverage
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "font-semibold bg-primary" : "font-medium"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/send-parcel"
              className={({ isActive }) =>
                isActive ? "font-semibold bg-primary" : "font-medium"
              }
            >
              Send A Parcel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/be-a-rider"
              className={({ isActive }) =>
                isActive ? "font-semibold bg-primary" : "font-medium"
              }
            >
              Be a Rider
            </NavLink>
          </li>
        </>
      )}
    </>
  );


  


  // logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Logout!",
              text: "User logout successfully",
              icon: "success",
            });
          })
          .catch((error) => {
            const errorMessage = error.code;
            toast.error(`Login failed ${errorMessage}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    });
  };

  return (
    <div className="navbar p-0 bg-base-100 py-4 px-6 rounded-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
      </div>
      <div className="navbar-end">

        {user ? (
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-hover dropdown-end lg:dropdown-start">
              <img
                tabIndex={0}
                className="w-14 bg-primary p-1 rounded-full cursor-pointer"
                src={`${user.photoURL}`}
                alt="user"
              />
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <p>{user.displayName}</p>
                </li>
                <li>
                  <Link to="/user-profile">Profile</Link>
                </li>
                <li className="md:hidden">
                  <button
                    className="text-red-500 flex items-center"
                    onClick={handleLogout}
                  >
                    Logout <MdOutlineLogout size={20} />
                  </button>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-error btn-outline md:flex items-center gap-1 hidden"
              onClick={handleLogout}
            >
              {" "}
              Logout
              <MdOutlineLogout size={20} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/register" className="btn btn-primary text-black hidden md:flex ">
              Register
            </Link>
            <Link to="/login" className="btn btn-primary text-black">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
