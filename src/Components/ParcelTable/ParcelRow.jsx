import React, { useState } from "react";
import { FaEye, FaTrash, FaMoneyBill } from "react-icons/fa";
import MyPayment from "../../Pages/MyPayment/MyPayment";

const ParcelRow = ({parcel, index, onView, onDelete}) => {
      let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <tr key={parcel._id}>
      <td>{index + 1}</td>
      <td>{parcel.title}</td>
      <td className="capitalize">{parcel.type}</td>
      <td>৳{parcel.cost}</td>
      {/* <td>৳{parcel._id}</td> */}
      <td>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            parcel.paymentStatus === "paid"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {parcel.paymentStatus === "paid" ? "Paid" : "Unpaid"}
        </span>
      </td>
      <td>{new Date(parcel.createdAt).toLocaleString()}</td>
      <td className="flex gap-2">
        <button
          onClick={() => onView(parcel)}
          className="btn btn-sm btn-outline"
          title="View Details"
        >
          <FaEye />
        </button>
        <MyPayment id={parcel._id} parcel={parcel}></MyPayment>
        <button
          onClick={()=>document.getElementById(parcel._id).showModal()}
          className="btn btn-sm btn-primary text-black"
          title="Pay"
          disabled={parcel.paymentStatus === "paid"}
        >
          <FaMoneyBill />
        </button>
        <button
          onClick={() => onDelete(parcel)}
          className="btn btn-sm btn-error text-white"
          title="Delete"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ParcelRow;
