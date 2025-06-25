import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser, loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    // login user
    loginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Login!",
          text: "User login successfully!",
          icon: "success",
          timer: 2000,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
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
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-30">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p>Login With ProFast</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input w-full"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-500">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p role="alert" className="text-red-500">
                Password must have 6 letters
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black font-thin mt-4">
              Login
            </button>
          </fieldset>
          <p className="mt-3">
            Don't have any account?{" "}
            <Link to="/register" className="text-primary font-bold">Register</Link>
          </p>
          <div className="divider">OR</div>
          <GoogleLogin></GoogleLogin>
        </form>
      </div>
    </div>
  );
};

export default Login;
