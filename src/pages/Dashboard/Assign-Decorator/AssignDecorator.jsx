import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const [activeBooking, setActiveBooking] = useState(null); // Stores the booking currently being assigned

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

  // 2. Fetch Approved Decorators for the modal
  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators", "available"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators/approved");
      return res.data;
    },
  });

  // 3. Handle the Assignment
  const handleAssign = (decorator) => {
    const assignmentData = {
      decoratorEmail: decorator.email,
      decoratorName: decorator.displayName,
      decoratorPhoto: decorator.photoURL,
      status: "decorator-assigned",
      assignedAt: new Date(),
    };

    // 1. Update the Booking
    axiosSecure
      .patch(`/bookings/assign/${activeBooking._id}`, assignmentData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          // 2. Update the Decorator's status in the decorators collection
          axiosSecure
            .patch(`/decorators/status/${decorator.email}`, {
              status: "assigned",
            })
            .then(() => {
              refetch(); // Refresh the list of bookings
              document.getElementById("assign_modal").checked = false;
              Swal.fire(
                "Assigned!",
                `${decorator.displayName} is now busy with this project.`,
                "success"
              );
            });
        }
      })
      .catch(() => toast.error("Failed to complete assignment"));
  };

  if (isLoading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl md:text-4xl font-semibold my-8">
        Pending assignments:{" "}
        <span className="text-primary">{bookings.length}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((bk) => (
          <div key={bk._id} className="card bg-white shadow-lg border p-4">
            <h3 className="font-bold text-xl text-primary">{bk.packageName}</h3>
            <p className="text-sm text-gray-500 mb-4">{bk.serviceName}</p>
            <div className="text-sm space-y-1 mb-4">
              <p>
                <strong>Date:</strong> {bk.bookingDate}
              </p>
              <p>
                <strong>Location:</strong> {bk.location}
              </p>
            </div>
            <div className="flex justify-end">
              <label
                htmlFor="assign_modal"
                className="btn btn-primary btn-sm"
                onClick={() => setActiveBooking(bk)}
              >
                Find Decorator
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <input type="checkbox" id="assign_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl  bg-amber-100">
          <h3 className="font-bold text-lg mb-4">
            Assign Decorator for: {activeBooking?.packageName}
          </h3>

          <div className="overflow-y-auto max-h-96">
            <table className="table w-full">
              <thead className="text-black">
                <tr>
                  <th>Decorator</th>
                  <th>Experience</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {decorators.map((dec) => (
                  <tr key={dec._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img src={dec.photoURL} alt={dec.displayName} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{dec.displayName}</div>
                          <div className="text-xs opacity-50">{dec.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{dec.experience} Years</td>
                    <td>
                      <button
                        onClick={() => handleAssign(dec)}
                        className="btn btn-xs btn-success text-white"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <label htmlFor="assign_modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignDecorator;
