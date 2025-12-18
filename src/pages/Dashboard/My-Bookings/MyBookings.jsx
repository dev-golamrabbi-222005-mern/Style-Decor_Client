import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { PiListMagnifyingGlassDuotone } from "react-icons/pi";
import { TbTrashXFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const {startLoading, stopLoading} = useLoading();

  const { data: bookings = [], refetch } = useQuery({
      queryKey: ["myBookings", user?.email],
      queryFn: async () => {
      startLoading()
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      stopLoading();
      return res.data;
    },
  });

const handleBookingUpdate = async (id) => {
  Swal.fire({
    title: "Update Booking?",
    text: "Only date and location will be updated.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, update",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const updateData = {
        bookingDate: selectedBooking.bookingDate,
        location: selectedBooking.location,
      };

      const res = await axiosSecure.patch(`/bookings/${id}`, updateData);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire("Updated!", "Booking updated successfully.", "success");
        setSelectedBooking(null);
        document.getElementById("detailsModal").checked = false;
      }
    }
  });
};

const formatStatus = (status) => {
  return status.replace(/([A-Z])/g, " $1").trim();
};

  const handleBookingDelete = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then( async(result) => {
      if (result.isConfirmed) {
        const updateStatus = {
        status: "cancelled",
      };

      const res = await axiosSecure.patch(`/bookings/${id}`, updateStatus);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire("Cancelled!", "Booking cancelled successfully.", "success");
        setSelectedBooking(null);
        document.getElementById("detailsModal").checked = false;
      }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl md:text-4xl font-semibold my-8 text-center md:text-left">
        My Bookings: <span className="text-primary">{bookings.length}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((bk) => (
          <div
            key={bk._id}
            className="card bg-white shadow-lg border border-gray-200 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-xl text-primary">
                  {bk.packageName}
                </h3>
                <p className="text-sm text-gray-500">{bk.serviceName}</p>
              </div>
              {bk.paymentStatus === "unPaid" || (
                <span className="badge badge-secondary badge-md text-[15px] capitalize">
                  {formatStatus(bk.status)}
                </span>
              )}
            </div>

            <div className="space-y-1 text-sm mb-4">
              <p>
                <strong>Date:</strong> {bk.bookingDate}
              </p>
              <p>
                <strong>Cost:</strong>{" "}
                <span className="text-blue-600 font-bold">৳{bk.price}</span>
              </p>
              <p className="truncate">
                <strong>Location:</strong> {bk.location}
              </p>
            </div>

            <div className="card-actions justify-end border-t pt-3">
              {/* Update Button */}
              {bk.status !== "cancelled" && bk.paymentStatus !== "Paid" && (
                <label
                  htmlFor="detailsModal"
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={() => setSelectedBooking(bk)}
                >
                  Update
                </label>
              )}

              {/* Pay / Paid Button */}
              {bk.status !== "cancelled" &&
                (bk.paymentStatus === "Paid" ? (
                  <button
                    className="btn btn-sm bg-primary/50 text-white"
                    disabled
                  >
                    Paid
                  </button>
                ) : (
                  <Link to={`/dashboard/payment-checkout/${bk._id}`}>
                    <button className="btn btn-sm btn-primary">Pay</button>
                  </Link>
                ))}

              <button
                onClick={() => handleBookingDelete(bk._id)}
                disabled={bk.status === "cancelled"}
                className={`btn btn-sm btn-error text-white ${
                  bk.status === "cancelled" || bk.paymentStatus === "Paid" ? "btn-disabled bg-red-800/50" : ""
                }`}
              >
                {bk.status === "cancelled" ? "Cancelled" : "Cancel"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== Update MODAL ===================== */}
      <input type="checkbox" id="detailsModal" className="modal-toggle" />
      {selectedBooking && (
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-amber-100">
            <h3 className="font-bold text-xl border-b pb-2 mb-4 text-primary">
              Update Booking
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBookingUpdate(selectedBooking._id);
              }}
              className="space-y-3"
            >
              {/* Read Only Fields */}
              <p>
                <strong>Package:</strong> {selectedBooking.packageName}
              </p>
              <p>
                <strong>Service:</strong> {selectedBooking.serviceName}
              </p>
              <p>
                <strong>Email:</strong> {selectedBooking.userEmail}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                <span className="text-blue-600">৳{selectedBooking.price}</span>
              </p>

              {/* Editable Date */}
              <div>
                <label className="label font-semibold">Booking Date</label>
                <input
                  type="date"
                  className="input input-bordered bg-gray-100 w-full"
                  defaultValue={selectedBooking.bookingDate}
                  onChange={(e) =>
                    setSelectedBooking({
                      ...selectedBooking,
                      bookingDate: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Editable Location */}
              <div>
                <label className="label font-semibold">Location</label>
                <input
                  type="text"
                  className="input input-bordered bg-gray-100 w-full"
                  defaultValue={selectedBooking.location}
                  onChange={(e) =>
                    setSelectedBooking({
                      ...selectedBooking,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update Booking
                </button>
                <label htmlFor="detailsModal" className="btn btn-ghost">
                  Cancel
                </label>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
