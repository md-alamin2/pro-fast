import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {user} = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // const [cost, setCost] = useState();
  const [senderCenters, setSenderCenters] = useState([]);
  const [receiverCenters, setReceiverCenters] = useState([]);

  const warehouses = useLoaderData();

  const regions = [...new Set(warehouses.map((w) => w.region))];

  useEffect(() => {
    const filtered = warehouses.filter((w) => w.region === senderRegion);
    setSenderCenters(filtered);
  }, [senderRegion, warehouses]);

  useEffect(() => {
    const filtered = warehouses.filter((w) => w.region === receiverRegion);
    setReceiverCenters(filtered);
  }, [receiverRegion, warehouses]);

  const onSubmit = async (data) => {
    const type = data.type;
    const fromRegion = data.senderRegion;
    const toRegion = data.receiverRegion;
    const weight = parseFloat(data.weight || 0);
    const sameRegion = fromRegion === toRegion;

    let baseRate = 0;
    let extraCharge = 0;
    let outsideCharge = 0;
    let total = 0;
    let breakdown = "";

    if (type === "document") {
      baseRate = sameRegion ? 60 : 80;
      total = baseRate;
      breakdown = `
        <p><strong>Parcel Type:</strong> Document</p>
        <p><strong>Weight:</strong> Any</p>
        <p><strong>Delivery Zone:</strong> ${
          sameRegion ? "Within City" : "Outside District"
        }</p>
        <p><strong>Base Cost:</strong> ৳${baseRate}</p>
      `;
    } else {
      if (weight <= 3) {
        baseRate = sameRegion ? 110 : 150;
        total = baseRate;
        breakdown = `
          <p><strong>Parcel Type:</strong> Non-Document</p>
          <p><strong>Weight:</strong> ${weight} kg (≤ 3kg)</p>
          <p><strong>Delivery Zone:</strong> ${
            sameRegion ? "Within City" : "Outside District"
          }</p>
          <p><strong>Base Cost:</strong> ৳${baseRate}</p>
        `;
      } else {
        const extraWeight = weight - 3;
        extraCharge = extraWeight * 40;
        outsideCharge = sameRegion ? 0 : 40;
        baseRate = sameRegion ? 110 : 150;
        total = baseRate + extraCharge + outsideCharge;

        breakdown = `
          <p><strong>Parcel Type:</strong> Non-Document</p>
          <p><strong>Weight:</strong> ${weight} kg (> 3kg)</p>
          <p><strong>Delivery Zone:</strong> ${
            sameRegion ? "Within City" : "Outside District"
          }</p>
          <p><strong>Base Cost:</strong> ৳${baseRate}</p>
          <p><strong>Extra Weight Charge:</strong> ৳${extraCharge} (${extraWeight.toFixed(
          2
        )}kg × ৳40/kg)</p>
          ${
            !sameRegion
              ? `<p><strong>Outside District Charge:</strong> ৳${outsideCharge}</p>`
              : ""
          }
        `;
      }
    }

    Swal.fire({
      title: "Review Delivery Cost",
      html: `
        <div style="text-align:left; font-size:15px; padding:10px 0">
          ${breakdown}
          <hr style="margin:10px 0;" />
          <p style="font-size:18px; font-weight:bold; color:#16a34a;">Total Cost: ৳${total.toFixed(
            2
          )}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "✅ Proceed to Payment",
      cancelButtonText: "✏️ Continue Editing",
      customClass: {
        popup: "rounded-xl shadow-md",
        confirmButton:
          "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700",
        cancelButton:
          "bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: total,
          created_by:user.email,
          paymentStatus:"Not paid",
          delivery_status: "Not Collected",
          createdAt: new Date().toISOString(),
        };
        console.log(parcelData);

        // try {
        //   const res = await axios.post(
        //     "https://your-server-endpoint.com/parcels",
        //     parcelData
        //   );

        //   if (res.data.insertedId) {
        //     setCost(total);
        //     Swal.fire("Success", "Parcel submitted successfully!", "success");
        //     reset();
        //   } else {
        //     Swal.fire("Error", "Failed to submit parcel.", "error");
        //   }
        // } catch (error) {
        //   Swal.fire("Error", "Something went wrong.", `${error}`);
        // }
      }
    });
  };

  return (
    <div className="w-11/12 lg:container mx-auto p-6 my-20 bg-base-100 rounded-xl">
      <h2 className="text-3xl font-bold mb-2">Send a Parcel</h2>
      <p className="mb-6 text-gray-600">Please fill in the details below</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* === Parcel Info === */}
        <div className="grid md:grid-cols-3 gap-4 bg-base-100 p-4 border rounded-xl">
          <div className="flex items-center gap-4 col-span-3">
            <label className="font-medium">
              Type:<sup className="text-red-500">*</sup>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("type", { required: true })}
                className="radio radio-primary"
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                defaultChecked
                value="non-document"
                {...register("type", { required: true })}
                className="radio radio-primary"
              />
              Non-Document
            </label>
          </div>

          <div>
            <label className="label text-black">
              Title<sup className="text-red-500">*</sup>
            </label>
            <input
              type="text"
              placeholder="Describe your parcel"
              {...register("title", { required: true })}
              className="input input-bordered w-full focus:outline-none"
            />
            {errors.title && <p className="text-red-500 text-sm">Required</p>}
          </div>

          <div>
            <label
              className={`label ${
                parcelType !== "document" ? "text-black" : ""
              }`}
            >
              Parcel Weight
              <sup
                className={`text-red-500 ${
                  parcelType === "document" ? "hidden" : ""
                }`}
              >
                *
              </sup>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Parcel Weight (KG)"
              {...register("weight")}
              className={`input input-bordered w-full remove-arrow focus:outline-none ${
                parcelType === "document" ? "bg-gray-100" : ""
              }`}
              disabled={parcelType === "document"}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* === Sender Info === */}
          <div className="bg-base-100 p-4 border rounded-xl md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Sender Info</h3>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label text-black">
                    Name<sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="text"
                    defaultValue="Md. Alamin"
                    className="input input-bordered w-full focus:outline-none"
                  />
                </div>
                <div>
                  <label className="label text-black">
                    Contact<sup className="text-red-500">*</sup>
                  </label>
                  <input
                    {...register("senderContact", { required: true })}
                    type="text"
                    className="input input-bordered w-full focus:outline-none"
                    placeholder="Contact number"
                  />
                  {errors.senderContact && (
                    <p className="text-red-500 text-sm">Contact is required</p>
                  )}
                </div>
                <div>
                  <label className="label text-black">
                    Region<sup className="text-red-500">*</sup>
                  </label>
                  <select
                    {...register("senderRegion", { required: true })}
                    className="select select-bordered w-full focus:outline-none"
                  >
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  {errors.senderRegion && (
                    <p className="text-red-500 text-sm">Region is required</p>
                  )}
                </div>
                <div>
                  <label className="label text-black">
                    Service Center<sup className="text-red-500">*</sup>
                  </label>
                  <select
                    {...register("senderServiceCenter", { required: true })}
                    className="select select-bordered w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    {senderCenters.map((sc, index) => (
                      <option key={index}>{sc.city}</option>
                    ))}
                  </select>
                  {errors.senderServiceCenter && (
                    <p className="text-red-500 text-sm">
                      Service Center is required
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full">
                <label className="label text-black">
                  Address<sup className="text-red-500">*</sup>
                </label>
                <input
                  {...register("senderAddress", { required: true })}
                  type="text"
                  className="input input-bordered w-full focus:outline-none"
                  placeholder="Your Address"
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm">Address is required</p>
                )}
              </div>
              <div className="w-full">
                <label className="label text-black">
                  Pickup Instruction<sup className="text-red-500">*</sup>
                </label>
                <textarea
                  {...register("pickupInstruction", { required: true })}
                  className="textarea w-full focus:outline-none"
                  placeholder="Write Pickup Instruction"
                ></textarea>
                {errors.pickupInstruction && (
                  <p className="text-red-500 text-sm">
                    Instruction is required
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* === Receiver Info === */}
          <div className="bg-base-100 p-4 border rounded-xl md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label text-black">
                    Receiver Name<sup className="text-red-500">*</sup>
                  </label>
                  <input
                    {...register("receiverName", { required: true })}
                    type="text"
                    className="input input-bordered w-full focus:outline-none"
                    placeholder="Receiver Name"
                  />
                  {errors.receiverName && (
                    <p className="text-red-500 text-sm">Name is required</p>
                  )}
                </div>
                <div>
                  <label className="label text-black">
                    Receiver Contact<sup className="text-red-500">*</sup>
                  </label>
                  <input
                    {...register("receiverContact", { required: true })}
                    type="text"
                    className="input input-bordered w-full focus:outline-none"
                    placeholder="Receiver Contact"
                  />
                  {errors.receiverContact && (
                    <p className="text-red-500 text-sm">Contact is required</p>
                  )}
                </div>
                <div>
                  <label className="label text-black">
                    Region<sup className="text-red-500">*</sup>
                  </label>
                  <select
                    {...register("receiverRegion", { required: true })}
                    className="select select-bordered w-full focus:outline-none"
                  >
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  {errors.receiverRegion && (
                    <p className="text-red-500 text-sm">Region is required</p>
                  )}
                </div>
                <div>
                  <label className="label text-black">
                    Service Center<sup className="text-red-500">*</sup>
                  </label>
                  <select
                    {...register("receiverServiceCenter", { required: true })}
                    className="select select-bordered w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    {receiverCenters.map((sc, index) => (
                      <option key={index}>{sc.city}</option>
                    ))}
                  </select>
                  {errors.receiverServiceCenter && (
                    <p className="text-red-500 text-sm">
                      Service Center is required
                    </p>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="label text-black">
                  Receiver Address<sup className="text-red-500">*</sup>
                </label>
                <input
                  {...register("receiverAddress", { required: true })}
                  type="text"
                  className="input input-bordered w-full focus:outline-none"
                  placeholder="Receiver Address"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 text-sm">Address is required</p>
                )}
              </div>
              <div className="md:col-span-3">
                <label className="label text-black">
                  Delivery Instruction<sup className="text-red-500">*</sup>
                </label>
                <textarea
                  {...register("deliveryInstruction", { required: true })}
                  className="textarea w-full focus:outline-none"
                  placeholder="Write Delivery Instruction"
                ></textarea>
                {errors.deliveryInstruction && (
                  <p className="text-red-500 text-sm">
                    Instruction is required
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary text-black w-full">
          Submit Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
