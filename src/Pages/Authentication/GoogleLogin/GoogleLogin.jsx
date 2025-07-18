import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxios from "../../../Hooks/useAxios";

const GoogleLogin = () => {
  const { loginWithGoogle, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  //   google login
  const handleGoogleLogin = () => {
    setLoading(true);
    loginWithGoogle()
      .then(async (result) => {
        const user = result.user;
        // set user on db
        const userInfo = {
          email: user.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("users", userInfo);

        if (userRes.data.modifiedCount) {
          setLoading(false);
          Swal.fire({
            title: "Login!",
            text: "User login successfully!",
            icon: "success",
            timer: 2000,
          });
          setUser(user);
          navigate(`${location.state ? location.state : "/"}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorMassage = error.code;
        toast.error(`${errorMassage}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] w-full"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        {loading ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : (
          "Login with Google"
        )}
      </button>
    </div>
  );
};

export default GoogleLogin;
