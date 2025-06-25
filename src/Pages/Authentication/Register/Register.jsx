import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import axios from "axios"
// import userImg from "../../../assets/image-upload-icon.png";

const Register = () => {
  const { createUser, updateUser, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (info) => {
    const { name, email, password } = info;
    const image = info.photo[0];
    const imgFormData = new FormData();
    imgFormData.append('image', image)
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imgFormData);
    const imgUrl =data.data.display_url;
    // create user
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: imgUrl })
          .then(() => {
            setUser({
              ...user,
              displayName: name,
              photoURL: imgUrl,
            });
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
            setUser(user);
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
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl  mt-20">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Create An Account</h1>
        <p>Register with ProFast</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* image */}
            <label htmlFor="files" className="block text-lg font-medium">
              Select your Profile picture
            </label>
            <div className="flex">
              <input
                type="file"
                {...register("photo", { required: true })}
                id="files"
                className="px-8 py-12 border-2 border-dashed border-primary rounded-md dark:text-gray-600 dark:bg-gray-100 hover:cursor-pointer"
              />
            </div>
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-red-500">
                Name is required
              </p>
            )}
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-500">
                Email is required
              </p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
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
            <button className="btn btn-primary text-black font-thin mt-4">
              Register
            </button>
          </fieldset>
          <p className="mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold">
              Login
            </Link>
          </p>
          <div className="divider">OR</div>
          <GoogleLogin></GoogleLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
