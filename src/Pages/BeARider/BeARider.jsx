import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const warehouses = useLoaderData();
  const regions = [...new Set(warehouses.map((w) => w.region))];

  const selectedRegion = watch("region");
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const filtered = warehouses.filter((w) => w.region === selectedRegion);
    setFilteredWarehouses(filtered);
  }, [selectedRegion, warehouses]);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user.displayName,
      email: user.email,
      img: user.photoURL,
      status: "Pending",
      created_at: new Date().toISOString(),
    };

    axiosSecure
      .post("riders", riderData)
      .then((res) => {
        if (res.data.insertedId) {
          swal.fire({
            icon: "success",
            title: "Application Submitted",
            text: "Your application is pending approval",
          });
        }
        reset();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-2">Be a Rider</h2>
      <p className="text-center text-gray-600 mb-6">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* name */}
        <div>
          <label className="label">Your Name</label>
          <input
            type="text"
            readOnly
            defaultValue={user.displayName}
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        {/* age */}
        <div>
          <label className="label">Your Age</label>
          <input
            type="number"
            placeholder="Your Age"
            {...register("age", { required: true })}
            className="input input-bordered w-full remove-arrow"
          />
          {errors.age && <p className="text-red-500 text-sm">Required</p>}
        </div>
        {/* email */}
        <div>
          <label className="label">Your Email</label>
          <input
            type="email"
            readOnly
            defaultValue={user.email}
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        {/* region */}
        <div>
          <label className="label">Your Region</label>
          <select
            {...register("region", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select your region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && <p className="text-red-500 text-sm">Required</p>}
        </div>
        {/* nid */}
        <div>
          <label className="label">NID No</label>
          <input
            type="number"
            placeholder="NID NO."
            {...register("nid", { required: true })}
            className="input input-bordered w-full remove-arrow"
          />
          {errors.nid && <p className="text-red-500 text-sm">Required</p>}
        </div>
        {/* contact */}
        <div>
          <label className="label">Contact</label>
          <input
            type="number"
            placeholder="Contact"
            {...register("contact", { required: true })}
            className="input input-bordered w-full remove-arrow"
          />
          {errors.contact && <p className="text-red-500 text-sm">Required</p>}
        </div>
        {/* warehouse */}
        <div className="md:col-span-2">
          <label className="label">Which warehouse you want to work?</label>
          <select
            {...register("warehouse", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="" className="text-black">
              Select warehouse
            </option>
            {filteredWarehouses.map((w, index) => (
              <option key={index} value={w.district}>
                {w.district}
              </option>
            ))}
          </select>
          {errors.warehouse && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn w-full bg-lime-400 hover:bg-lime-500 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;
