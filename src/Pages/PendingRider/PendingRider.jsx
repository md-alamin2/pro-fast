import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaUserClock,
  FaEye,
  FaCheck,
  FaTimes,
  FaUserShield,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaWarehouse,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PendingRider = () => {
  //   const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending");
      return res.data;
    },
  });

  const handleApprove = (riderId, riderName) => {
    Swal.fire({
      title: "Approve Rider",
      text: `Approve ${riderName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        const riderData ={
          riderId,
          status:"Rider"
        }
        axiosSecure
          .patch("riders", riderData)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire("Approved!", "", "success");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  };

  const handleReject = (riderId, riderName) => {
    Swal.fire({
      title: "Reject Application",
      text: `Reject ${riderName}'s application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axiosSecure
          .delete("riders", {data:{riderId}})
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Rejected!", "", "success");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  };

  const openModal = (rider) => {
    setSelectedRider(rider);
    document.getElementById("rider_modal").showModal();
  };

  if (isPending) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaUserClock className="mr-2" /> Pending Riders
      </h1>

      {/* Table with Actions */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {riders
              .filter((r) => r.status === "Pending")
              .map((rider, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{rider.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rider.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rider.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {rider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => openModal(rider)}
                      className="btn btn-info"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleApprove(rider._id, rider.name)}
                      className="btn btn-success"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReject(rider._id, rider.name)}
                      className="btn btn-error"
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Information-Only Modal */}
      <dialog id="rider_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg flex items-center">
              <FaUserShield className="mr-2" /> Rider Details
            </h3>
            <button
              onClick={() => document.getElementById("rider_modal").close()}
              className="btn btn-sm btn-circle"
            >
              ✕
            </button>
          </div>

          {selectedRider && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="avatar placeholder">
                  <div className="rounded-full w-16">
                    <img src={selectedRider?.img} alt="" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedRider.name}</h2>
                  <p className="text-sm text-gray-500">{selectedRider.email}</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={<FaIdCard />}
                  label="NID"
                  value={selectedRider.nid}
                />
                <DetailItem
                  icon={<FaPhone />}
                  label="Contact"
                  value={selectedRider.contact}
                />
                <DetailItem
                  icon={<FaMapMarkerAlt />}
                  label="Region"
                  value={selectedRider.region}
                />
                <DetailItem
                  icon={<FaWarehouse />}
                  label="Warehouse"
                  value={selectedRider.warehouse}
                />
                <DetailItem
                  icon={<FaCalendarAlt />}
                  label="Age"
                  value={`${selectedRider.age} years`}
                />
                <DetailItem
                  icon={<FaEnvelope />}
                  label="Applied On"
                  value={new Date(
                    selectedRider.created_at
                  ).toLocaleDateString()}
                />
              </div>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

// Reusable component for detail items
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="mt-1 text-gray-500">{icon}</div>
    <div>
      <p className="font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  </div>
);

export default PendingRider;
