import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import ParcelTable from "../../Components/ParcelTable/ParcelTable";


const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-parcels?email=${user?.email}`);
      return res.data;
    },
  });
  const handleView = (parcel) => {
    Swal.fire({
      title: "Parcel Details",
      html: `<pre style="text-align:left;">${JSON.stringify(
        parcel,
        null,
        2
      )}</pre>`,
      width: 600,
    });
  };

  const handlePay = async (parcel, isOpen, close) => {
    
  return<MyParcel isOpen></MyParcel>
  };

  const handleDelete = async (parcel) => {
    const confirm = await Swal.fire({
      title: "Delete Parcel?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`parcels/${parcel._id}`).then((res) => {
        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "Parcel has been deleted.", "success");
        }
      }).catch(error=>{
        console.log(error);
      })
      refetch()
    }
  };

  return (
    <ParcelTable
      parcels={parcels}
      onView={handleView}
      handlePay={handlePay}
      onDelete={handleDelete}
    />
  );
};
export default MyParcel;
