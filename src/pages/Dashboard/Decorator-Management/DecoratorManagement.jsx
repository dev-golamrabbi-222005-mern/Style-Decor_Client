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

const DecoratorManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: decoratorsData = [], refetch } = useQuery({
    queryKey: ["decorator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  // Function for Approval / Rejection
const handleStatusUpdate = (id, email, newStatus) => {
  axiosSecure
    .patch(`/decorators/status/${id}`, {
      applicationStatus: newStatus,
      email: email,
    })
    .then((res) => {
      // Check if the document was found and processed
      if (res.data.matchedCount > 0) {
        refetch();
        toast.success(`Application ${newStatus} successfully!`);
      } else {
        toast.error("No changes made or decorator not found.");
      }
    })
    .catch((err) => {
      console.error("Patch Error:", err);
      toast.error("Server error: Could not update status");
    });
};

  // Function for Deleting/Banning with confirmation
  const handleUpdateRole = (id, type) => {
    const isDelete = type === "delete";

    Swal.fire({
      title: "Are you sure?",
      text: isDelete
        ? "This decorator will be permanently removed!"
        : "This decorator will not be able to login!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        const request = isDelete
          ? axiosSecure.delete(`/decorators/${id}`)
          : axiosSecure.patch(`/decorators/ban/${id}`);

        request.then((res) => {
          if (res.data.deletedCount > 0 || res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Success!", `Action completed.`, "success");
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
                    {/* Make Admin - Keep your existing one for role swapping */}
                    <button
                      onClick={() =>
                        handleUpdateRole(decorator._id, "admin", "admin")
                      }
                      disabled={decorator.role === "admin"}
                      className={`btn btn-square tooltip ${
                        decorator.role === "admin"
                          ? "btn-disabled"
                          : "btn-info text-white"
                      }`}
                      data-tip="Make Admin"
                    >
                      <FaUserShield size={18} />
                    </button>

                    {/* Ban decorator */}
                    <button
                      onClick={() => handleAction(decorator._id, "ban")}
                      disabled={decorator.status === "banned"}
                      className="btn btn-square tooltip btn-warning text-white"
                      data-tip={
                        decorator.status === "banned" ? "Already Banned" : "BAN"
                      }
                    >
                      <BsPersonFillSlash size={18} />
                    </button>

                    {/* Approve Button */}
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          decorator._id,
                          decorator.email,
                          "approved"
                        )
                      }
                      disabled={decorator.applicationStatus === "approved"}
                      className={`btn btn-square tooltip btn-success text-white ${
                        decorator.applicationStatus === "approved"
                          ? "btn-disabled opacity-50"
                          : ""
                      }`}
                      data-tip="Approve Decorator"
                    >
                      <BsPersonFillCheck size={18} />
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          decorator._id,
                          decorator.email,
                          "rejected"
                        )
                      }
                      disabled={decorator.applicationStatus === "rejected"}
                      className={`btn btn-square tooltip btn-secondary text-white ${
                        decorator.applicationStatus === "rejected"
                          ? "btn-disabled opacity-50"
                          : ""
                      }`}
                      data-tip="Reject Decorator"
                    >
                      <BsPersonFillX size={18} />
                    </button>

                    {/* Remove decorator */}
                    <button
                      onClick={() => handleAction(decorator._id, "delete")}
                      className="btn btn-square tooltip btn-error text-white"
                      data-tip="Remove decorator"
                    >
                      <BsPersonFillDash size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default DecoratorManagement;
