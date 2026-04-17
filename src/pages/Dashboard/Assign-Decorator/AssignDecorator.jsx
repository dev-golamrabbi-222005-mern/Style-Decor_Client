import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaUserPlus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSearch,
  FaUserTie,
} from "react-icons/fa";

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const [activeBooking, setActiveBooking] = useState(null);

  // 1. Fetch Bookings that need a decorator
  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", "paymentDone"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?status=paymentDone`);
      return res.data;
    },
  });

  // 2. Fetch Approved Decorators
  const { data: decorators = [], refetch: decoratorRefetch } = useQuery({
    queryKey: ["decorators", "available"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators?status=available");
      return res.data;
    },
  });

  const handleAssign = (decorator) => {
    const assignmentData = {
      decoratorEmail: decorator.email,
      status: "pending-approval",
      assignRequestAt: new Date(),
    };

    axiosSecure
      .patch(`/bookings/assign/${activeBooking._id}`, assignmentData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          axiosSecure
            .patch(`/decorators/status-update-by-email/${decorator.email}`, {
              status: "assigned",
            })
            .then(() => {
              refetch();
              decoratorRefetch();
              document.getElementById("assign_modal").checked = false;
              Swal.fire({
                title: "Request Sent!",
                text: `Waiting for ${decorator.displayName} to accept.`,
                icon: "success",
                confirmButtonColor: "#3b82f6",
              });
            });
        }
      });
  };

  if (isLoading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="pb-10">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-800 tracking-tight">
          Assign Decorators to the Project
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          You have{" "}
          <span className="text-primary font-bold">{bookings.length}</span>{" "}
          projects waiting for professional assignment
        </p>
      </div>

      {/* Grid Layout for Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((bk) => (
          <div
            key={bk._id}
            className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                <FaUserPlus size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">
                Paid
              </span>
            </div>

            <h3 className="font-black text-xl text-slate-800 mb-1 leading-tight">
              {bk.packageName}
            </h3>
            <p className="text-xs text-slate-400 font-medium mb-4">
              {bk.serviceName}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <FaCalendarAlt className="text-slate-300" />
                <span>{new Date(bk.bookingDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <FaMapMarkerAlt className="text-slate-300" />
                <span className="truncate">{bk.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                <FaMoneyBillWave className="text-green-400" />
                <span className="text-slate-800 text-lg">৳{bk.price}</span>
              </div>
            </div>

            <label
              htmlFor="assign_modal"
              className="btn btn-primary w-full rounded-2xl font-bold shadow-lg shadow-primary/20"
              onClick={() => setActiveBooking(bk)}
            >
              Find Decorator
            </label>
          </div>
        ))}
      </div>

      {/* No Data State */}
      {bookings.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium italic">
            No pending assignments found at the moment.
          </p>
        </div>
      )}

      {/* ================= MODERN MODAL ================= */}
      <input type="checkbox" id="assign_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl rounded-[2.5rem] p-0 overflow-hidden bg-white">
          <div className="p-8 bg-slate-800 text-white flex justify-between items-center">
            <div>
              <h3 className="font-black text-xl">Available Decorators</h3>
              <p className="text-slate-400 text-xs">
                Assigning for: {activeBooking?.packageName}
              </p>
            </div>
            <label
              htmlFor="assign_modal"
              className="btn btn-circle btn-sm btn-ghost"
            >
              ✕
            </label>
          </div>

          <div className="p-4 max-h-[50vh] overflow-y-auto">
            <table className="table w-full border-separate border-spacing-y-2">
              <thead className="text-slate-400 uppercase text-[10px] font-black tracking-widest">
                <tr>
                  <th className="bg-transparent">Decorator Info</th>
                  <th className="bg-transparent">Experience</th>
                  <th className="bg-transparent text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {decorators.map((dec) => (
                  <tr
                    key={dec._id}
                    className="bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <td className="rounded-l-2xl border-none">
                      <div className="flex items-center gap-3 py-2">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10 ring ring-primary/20 ring-offset-2 ring-offset-white">
                            <img src={dec.photoURL} alt={dec.displayName} />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">
                            {dec.displayName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {dec.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-none">
                      <div className="flex items-center gap-2 text-slate-600 font-bold">
                        <FaUserTie className="text-slate-300" />
                        {dec.experience} Years
                      </div>
                    </td>
                    <td className="rounded-r-2xl border-none text-right">
                      <button
                        onClick={() => handleAssign(dec)}
                        className="btn btn-sm btn-primary rounded-xl px-6"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {decorators.length === 0 && (
              <div className="text-center py-10">
                <p className="text-slate-400 text-sm">
                  No decorators available right now.
                </p>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-50 flex justify-end">
            <label htmlFor="assign_modal" className="btn btn-ghost rounded-xl outline-1">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignDecorator;
