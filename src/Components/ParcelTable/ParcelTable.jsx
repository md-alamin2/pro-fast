import React, { useState } from "react";

import MyPayment from "../../Pages/MyPayment/MyPayment";
import ParcelRow from "./ParcelRow";

const ParcelTable = ({ parcels, onView, onDelete }) => {

  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl p-4">
      <h2 className="text-2xl font-bold mb-4">All Parcels</h2>
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr className="bg-base-200 text-base">
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Payment Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.length > 0 ? (
            parcels.map((parcel, index) => (
                <ParcelRow key={index} index={index} parcel={parcel} onView={onView} onDelete={onDelete}></ParcelRow>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No parcels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;
