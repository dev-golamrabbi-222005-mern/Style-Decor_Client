import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FaUserShield,
  FaSearch,
  FaCalendarAlt,
  FaUserTie,
  FaTrashAlt,
  FaBan,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const DecoratorManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const isDemoUser = user?.role === "demoUser";

  const {
    data: decoratorsData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["decorator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  // Handle Approval/Rejection
  const handleStatusUpdate = (id, email, newStatus) => {
    axiosSecure
      .patch(`/decorators/status/${id}`, {
        applicationStatus: newStatus,
        email,
      })
      .then((res) => {
        if (res.data.acknowledged) {
          refetch();
          toast.success(`User is now ${newStatus}`);
        }
      })
      .catch(() => toast.error("Update failed"));
  };

  // Handle Admin, Ban, and Delete
  const handleAction = (id, actionType) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${actionType} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: actionType === "delete" ? "#ef4444" : "#3b82f6",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        let request;
        if (actionType === "delete")
          request = axiosSecure.delete(`/decorators/${id}`);
        else if (actionType === "ban")
          request = axiosSecure.patch(`/decorators/ban/${id}`);
        else if (actionType === "admin")
          request = axiosSecure.patch(`/decorators/admin/${id}`);

        request.then((res) => {
          if (res.data.modifiedCount > 0 || res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Success!", `User has been ${actionType}ed.`, "success");
          }
        });
      }
    });
  };

  // Filter Logic
  const filteredDecorators = useMemo(() => {
    return decoratorsData.filter(
      (d) =>
        d.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [decoratorsData, searchTerm]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDecorators.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredDecorators.length / itemsPerPage);

  if (isLoading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="pb-10">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-800">
            Manage Decorators
          </h1>
          <p className="text-slate-500 text-sm italic mt-2">
            Managing {decoratorsData.length} professional decorators
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute top-2.5 left-2.5 z-10" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered pl-12 w-full bg-white rounded-2xl border-slate-200 focus:outline-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">Decorator</th>
                <th>Experience</th>
                <th>Apply Date</th>
                <th className="text-center">Status</th>
                <th className="pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {currentItems.map((decorator) => (
                <tr
                  key={decorator._id}
                  className="hover:bg-slate-50/80 transition-colors border-b border-slate-50"
                >
                  <td className="py-4 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10 ring ring-primary ring-offset-2 ring-offset-white">
                          <img
                            src={decorator.photoURL}
                            alt={decorator.displayName}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">
                          {decorator.displayName}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {decorator.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-slate-300" />
                      <span className="font-bold text-slate-700">
                        {decorator.experience} Years
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-xs">
                      <FaCalendarAlt className="text-slate-300" />
                      {decorator.appliedAt?.split("T")[0]}
                    </div>
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge badge-sm font-bold uppercase tracking-tighter py-3 px-4 ${
                        decorator.applicationStatus === "approved"
                          ? "badge-success text-white"
                          : decorator.applicationStatus === "rejected"
                            ? "badge-error text-white"
                            : "badge-ghost text-slate-500"
                      }`}
                    >
                      {decorator.applicationStatus}
                    </span>
                  </td>
                  <td className="pr-8">
                    <div className="flex justify-end items-center gap-2">
                      {/* Action Buttons with Tooltips */}
                      <button
                        disabled={isDemoUser}
                        onClick={() => handleAction(decorator._id, "admin")}
                        className="btn btn-square btn-ghost btn-xs text-info hover:bg-info/10 tooltip"
                        data-tip="Make Admin"
                      >
                        <FaUserShield size={16} />
                      </button>

                      <button
                        disabled={isDemoUser}
                        onClick={() =>
                          handleStatusUpdate(
                            decorator._id,
                            decorator.email,
                            "approved",
                          )
                        }
                        className="btn btn-square btn-ghost btn-xs text-success hover:bg-success/10 tooltip"
                        data-tip="Approve"
                      >
                        <FaCheckCircle size={16} />
                      </button>

                      <button
                        disabled={isDemoUser}
                        onClick={() =>
                          handleStatusUpdate(
                            decorator._id,
                            decorator.email,
                            "rejected",
                          )
                        }
                        className="btn btn-square btn-ghost btn-xs text-warning hover:bg-warning/10 tooltip"
                        data-tip="Reject"
                      >
                        <FaTimesCircle size={16} />
                      </button>

                      <button
                        disabled={isDemoUser}
                        onClick={() => handleAction(decorator._id, "ban")}
                        className="btn btn-square btn-ghost btn-xs text-slate-400 hover:bg-slate-100 tooltip"
                        data-tip="Ban"
                      >
                        <FaBan size={14} />
                      </button>

                      <button
                        disabled={isDemoUser}
                        onClick={() => handleAction(decorator._id, "delete")}
                        className="btn btn-square btn-ghost btn-xs text-error hover:bg-error/10 tooltip"
                        data-tip="Delete"
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

        {/* Empty State */}
        {filteredDecorators.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            <p className="text-lg font-medium">
              No decorators found matching your search.
            </p>
          </div>
        )}

        {/* Pagination & Footer */}
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <p className="text-sm text-slate-500 font-medium">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredDecorators.length)} of{" "}
            {filteredDecorators.length} entries
          </p>
          <div className="join">
            <button
              className="join-item btn btn-sm bg-gray-300 text-black text-lg"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "bg-white"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="join-item btn btn-sm bg-gray-300 text-black text-lg"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecoratorManagement;
