import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSearch = async () => {
    setLoading(true);
    setUser(null);
    try {
      const res = await axiosSecure.get(`users?email=${email}`);
      setUser(res.data);
    } catch (error) {
      console.error("User not found", error);
      Swal.fire("Error", "User not found", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async () => {
    const confirm = await Swal.fire({
      title: "Make Admin?",
      text: `Do you want to promote ${user.email} to Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, promote!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`users/admin/${user._id}`, {
        role: "admin",
      });
      Swal.fire("Success", "User is now an admin.", "success");
      setUser({ ...user, role: "admin" });
    }
  };

  const handleRemoveAdmin = async () => {
    const confirm = await Swal.fire({
      title: "Remove Admin?",
      text: `Do you want to revoke admin rights from ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`users/admin/${user._id}`, {
        role: "user",
      });
      Swal.fire("Success", "Admin rights removed.", "success");
      setUser({ ...user, role: "user" });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">🔍 Find User by Email</h2>

      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary text-black">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {user && (
        <div className="mt-6 p-4 border rounded">
          <div className="flex items-center gap-4">
            <img src={user.image} alt="User" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-bold">{user.email}</p>
              <p className="text-sm text-gray-600">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              <p className="text-sm">
                Role: <span className="badge badge-outline">{user.role}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {user.role !== "admin" ? (
              <button onClick={handleMakeAdmin} className="btn btn-success btn-sm">
                Make Admin
              </button>
            ) : (
              <button onClick={handleRemoveAdmin} className="btn btn-warning btn-sm">
                Remove Admin
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
