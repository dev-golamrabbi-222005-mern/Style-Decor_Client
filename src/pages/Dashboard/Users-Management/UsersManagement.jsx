import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FaUserShield,
  FaSearch,
  FaUserTag,
  FaTrashAlt,
  FaBan,
  FaCalendarAlt,
  FaUserPlus,
} from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const { user: currentUser } = useAuth();
  const isDemoUser = currentUser?.role === "demoUser";

  const {
    data: usersData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    enabled: !!currentUser?.email && !isDemoUser,
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Role Update Logic
  const handleUpdateRole = (id, role, actionName) => {
    axiosSecure
      .patch(`/users/${actionName}/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`Role updated to ${role}!`);
        }
      })
      .catch(() => toast.error("Update failed"));
  };

  // Delete/Ban Logic
  const handleAction = (id, type) => {
    const isDelete = type === "delete";
    Swal.fire({
      title: "Are you sure?",
      text: isDelete
        ? "This user will be permanently removed!"
        : "This user will be restricted from access!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isDelete ? "#ef4444" : "#f59e0b",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        const request = isDelete
          ? axiosSecure.delete(`/users/${id}`)
          : axiosSecure.patch(`/users/ban/${id}`);
        request.then((res) => {
          if (res.data.deletedCount > 0 || res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Action Successful", "", "success");
          }
        });
      }
    });
  };

  // Search Filter
  const filteredUsers = useMemo(() => {
    return usersData.filter(
      (user) =>
        user?.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [usersData, searchTerm]);

  if (isLoading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-800">
            Manage Users
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Overview of {usersData.length} registered users
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute z-10 top-4 left-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered pl-12 w-full bg-white rounded-2xl border-slate-200 focus:outline-primary h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">User Information</th>
                <th>Join Date</th>
                <th>Current Role</th>
                <th className="pr-8 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-slate-50/50 transition-colors border-b border-slate-50"
                >
                  <td className="py-4 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-11 h-11 ring ring-primary/10 ring-offset-2 ring-offset-white">
                          <img
                            src={
                              user.photoURL ||
                              "https://i.ibb.co/mR9pY7L/user.png"
                            }
                            alt={user.displayName}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">
                          {user.displayName}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <FaCalendarAlt className="text-slate-300" />
                      {user.createdAt ? user.createdAt.split("T")[0] : "N/A"}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm font-black px-3 py-3 uppercase tracking-tighter ${
                        user.role === "admin"
                          ? "badge-primary text-white"
                          : user.role === "decorator"
                            ? "badge-secondary text-white"
                            : "badge-ghost text-slate-300"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="pr-8">
                    <div className="flex justify-end items-center gap-2">
                      {/* Action: Admin */}
                      <button
                        disabled={isDemoUser || user.role === "admin"}
                        onClick={() =>
                          handleUpdateRole(user._id, "admin", "admin")
                        }
                        className="btn btn-square btn-ghost btn-xs text-info hover:bg-info/10 tooltip"
                        data-tip="Promote to Admin"
                      >
                        <FaUserShield size={16} />
                      </button>

                      {/* Action: Decorator */}
                      <button
                        disabled={isDemoUser || user.role === "decorator"}
                        onClick={() =>
                          handleUpdateRole(user._id, "decorator", "decorator")
                        }
                        className="btn btn-square btn-ghost btn-xs text-success hover:bg-success/10 tooltip"
                        data-tip="Make Decorator"
                      >
                        <FaUserPlus size={16} />
                      </button>

                      {/* Action: Ban */}
                      <button
                        disabled={isDemoUser || user.status === "banned"}
                        onClick={() => handleAction(user._id, "ban")}
                        className={`btn btn-square btn-ghost btn-xs tooltip ${user.status === "banned" ? "text-slate-300" : "text-warning hover:bg-warning/10"}`}
                        data-tip={
                          user.status === "banned"
                            ? "Already Banned"
                            : "Ban User"
                        }
                      >
                        <FaBan size={14} />
                      </button>

                      {/* Action: Delete */}
                      <button
                        disabled={isDemoUser}
                        onClick={() => handleAction(user._id, "delete")}
                        className="btn btn-square btn-ghost btn-xs text-error hover:bg-error/10 tooltip"
                        data-tip="Remove User"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bug Fix for Empty UI */}
        {filteredUsers.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center p-20 text-slate-400">
            <FaUserTag size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">
              No users found in the records.
            </p>
          </div>
        )}
      </div>

      {isDemoUser && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700 text-center text-sm font-medium">
          🔒 You are in <b>Demo Mode</b>. Administrative actions are restricted.
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
