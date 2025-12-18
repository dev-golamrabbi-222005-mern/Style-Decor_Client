import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useLoading from '../../../hooks/useLoading';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';



const PaymentHistory = () => {
      const { user } = useAuth();
      const axiosSecure = useAxiosSecure();
      const [selectedBooking, setSelectedBooking] = useState(null);
      const { startLoading, stopLoading } = useLoading();

      const { data: bookings = [], refetch } = useQuery({
        queryKey: ["myBookings", user?.email],
        queryFn: async () => {
          startLoading();
          const res = await axiosSecure.get(`/bookings?email=${user.email}`);
          stopLoading();
          return res.data;
        },
      });

    return (
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-semibold my-8 text-center md:text-left">
          My Payment History: <span className="text-primary">{bookings.length}</span>
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
                <span className="badge badge-secondary badge-md text-[15px] capitalize">
                  {(bk.status === "pendingToPay" && "Pending To Pay") ||
                    bk.status}
                </span>
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
                <label
                  htmlFor="detailsModal"
                  className={`btn btn-sm btn-outline btn-primary ${
                    bk.status === "cancelled" ? "btn-disabled" : ""
                  }`}
                  onClick={() => {
                    if (bk.status !== "cancelled") setSelectedBooking(bk);
                  }}
                >
                  Update
                </label>

                {bk.paymentStatus === "paid" ? (
                  <button
                    disabled
                    className="btn btn-square bg-primary text-white"
                  >
                    Paid
                  </button>
                ) : (
                  <Link to={`/dashboard/payment/${bk._id}`}>
                    <button className="btn btn-sm btn-primary">Pay</button>
                  </Link>
                )}

                <button
                  onClick={() => handleBookingDelete(bk._id)}
                  disabled={bk.status === "cancelled"}
                  className={`btn btn-sm btn-error text-white ${
                    bk.status === "cancelled" ? "btn-disabled bg-red-800" : ""
                  }`}
                >
                  {bk.status === "cancelled" ? "Cancelled" : "Cancel"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default PaymentHistory;