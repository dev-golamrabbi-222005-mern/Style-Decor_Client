import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { BsPersonFillDash } from "react-icons/bs";
import { BsPersonFillX } from "react-icons/bs";
import { BsPersonFillSlash } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const DecoratorManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const {user} = useAuth();
  const isDemoUser = user?.role === "demoUser";
  const { data: decoratorsData = [], refetch } = useQuery({
    queryKey: ["decorator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  // 1. Handle Approval/Rejection
  const handleStatusUpdate = (id, email, newStatus) => {
    axiosSecure
      .patch(`/decorators/status/${id}`, {
        applicationStatus: newStatus,
        email,
      })
      .then((res) => {
        // We check acknowledged because matchedCount might be 0 if the collection is wrong
        if (res.data.acknowledged) {
          refetch();
          toast.success(`User is now ${newStatus}`);
        }
      })
      .catch(() => toast.error("Update failed"));
  };

  // 2. Handle Admin, Ban, and Delete (Consolidated)
  const handleAction = (id, actionType) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${actionType} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        let request;
        if (actionType === "delete")
          request = axiosSecure.delete(`/decorators/${id}`);
        else if (actionType === "ban")
          request = axiosSecure.patch(`/decorators/ban/${id}`);
        else if (actionType === "admin")
          request = axiosSecure.patch(`/decorators/admin/${id}`); // Adjust route as needed

        request.then((res) => {
          if (res.data.modifiedCount > 0 || res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Done!", `User has been ${actionType}ed.`, "success");
          }
        });
      }
    });
  };

  const filteredDecorators = decoratorsData.filter(
    (decorator) =>
      decorator.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      decorator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto my-11">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          All Decorators List: {decoratorsData.length}
        </h1>
        <label className="input bg-amber-100">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            required
            placeholder="Search decorator via Name or Email"
          />
        </label>
      </div>
      <div className="overflow-x-auto bg-primary p-5 rounded-2xl my-7">
        <table className="table bg-white text-center">
          {/* head */}
          <thead className="text-lg text-black bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Apply Date</th>
              <th>Experience (yr)</th>
              <th>Application Status</th>
              <th>Take Action</th>
            </tr>
          </thead>
          {/* row 1 */}
          {filteredDecorators.map((decorator, index) => {
            return (
              <tbody key={index} className="text-[16px]">
                <tr>
                  <td>
                    <div className="flex items-center gap-5">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={decorator.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{decorator.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{decorator.email}</td>
                  <td>{decorator.appliedAt.split("T")[0]}</td>
                  <td className="font-semibold">{decorator.experience}</td>
                  <td>
                    <span
                      className={`badge ${
                        decorator.applicationStatus === "approved"
                          ? "badge-success"
                          : decorator.applicationStatus === "rejected"
                          ? "badge-error"
                          : "badge-ghost"
                      }`}
                    >
                      {decorator.applicationStatus}
                    </span>
                  </td>
                  <td className="flex items-center justify-center gap-2">
                    {/* Make Admin */}
                    <button
                      disabled={isDemoUser}
                      onClick={() => handleAction(decorator._id, "admin")}
                      className="btn btn-square btn-info text-white tooltip"
                      data-tip="Make Admin"
                    >
                      <FaUserShield size={18} />
                    </button>

                    {/* Ban */}
                    <button
                      disabled={isDemoUser}
                      onClick={() => handleAction(decorator._id, "ban")}
                      className="btn btn-square btn-warning text-white tooltip"
                      data-tip="Ban User"
                    >
                      <BsPersonFillSlash size={18} />
                    </button>

                    {/* Approve */}
                    <button
                      disabled={isDemoUser}
                      onClick={() =>
                        handleStatusUpdate(
                          decorator._id,
                          decorator.email,
                          "approved"
                        )
                      }
                      className="btn btn-square btn-success text-white tooltip"
                      data-tip="Approve"
                    >
                      <BsPersonFillCheck size={18} />
                    </button>

                    {/* Reject */}
                    <button
                      disabled={isDemoUser}
                      onClick={() =>
                        handleStatusUpdate(
                          decorator._id,
                          decorator.email,
                          "rejected"
                        )
                      }
                      className="btn btn-square btn-secondary text-white tooltip"
                      data-tip="Reject"
                    >
                      <BsPersonFillX size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      disabled={isDemoUser}
                      onClick={() => handleAction(decorator._id, "delete")}
                      className="btn btn-square btn-error text-white tooltip"
                      data-tip="Remove"
                    >
                      <BsPersonFillDash size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        {isDemoUser && (
          <p className="text-sm text-warning text-center mt-2">
            Demo users can explore but cannot perform these actions.
          </p>
        )}
      </div>
    </div>
  );
};

export default DecoratorManagement;
