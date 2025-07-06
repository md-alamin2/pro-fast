import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
// import userImg from "../../../assets/image-upload-icon.png";

const Register = () => {
  const [previewURL, setPreviewURL] = useState(null);
  const { createUser, updateUser, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  const onSubmit = async (info) => {
    setLoading(true);
    const { name, email, password } = info;
    const image = info.photo[0];
    const imgFormData = new FormData();
    imgFormData.append("image", image);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      imgFormData
    );
    const imgUrl = data.data.display_url;
    // create user
    createUser(email, password)
      .then(async(result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: imgUrl })
          .then( () => {
            // set user
            setUser({
              ...user,
              displayName: name,
              photoURL: imgUrl,
            });
          })
          .catch((error) => {
            const errorMassage = error.code;
            setUser(user);
            setLoading(false)
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
          // set user on db
            const userInfo = {
              email: user.email,
              role: "user",
              created_at: new Date().toISOString(),
              last_login: new Date().toISOString()
            };

            const userRes = await axiosInstance.post("users", userInfo);

            if (userRes.data.insertedId) {
              setLoading(false);
              Swal.fire({
                title: "Login!",
                text: "User login successfully!",
                icon: "success",
                timer: 2000,
              });
              navigate(`${location.state ? location.state : "/"}`);
            }
      })
      .catch((error) => {
        const errorMassage = error.code;
        setLoading(false)
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!validTypes.includes(file.type)) {
      Swal.fire("Invalid Format", "Only JPG, PNG, or GIF allowed", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire("Too Large", "File must be less than 2MB", "error");
      return;
    }

    setPreviewURL(URL.createObjectURL(file));
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl  mt-20">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Create An Account</h1>
        <p>Register with ProFast</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* image */}
            <label
              htmlFor="fileInput"
              className="w-full h-48 border border-dashed border-gray-300 bg-gray-50 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-500 transition py-9"
            >
              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="h-full object-contain rounded"
                />
              ) : (
                <>
                  <FaUpload className="text-2xl mb-2 text-gray-500" />
                  <p className="font-semibold text-gray-700">Upload picture</p>
                  <p className="text-sm text-gray-500">
                    Choose photo size &lt;{" "}
                    <span className="font-semibold">2mb</span>
                    <br />
                    Format:{" "}
                    <span className="font-semibold">JPG, PNG, or GIF</span>
                  </p>
                </>
              )}

              <input
                type="file"
                id="fileInput"
                {...register("photo", { required: true })}
                accept="image/png, image/jpeg, image/gif"
                onChange={handleFileChange}
                // className="hidden"
              />
            </label>
            {errors.photo?.type === "required" && (
              <p role="alert" className="text-red-500">
                Photo is required
              </p>
            )}
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
              {loading ? (
                <span className="loading loading-spinner loading-xl"></span>
              ) : (
                "Register"
              )}
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
