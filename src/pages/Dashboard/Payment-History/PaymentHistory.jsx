import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useLoading from "../../../hooks/useLoading";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      console.log(res.data);
      
      return res.data;
    },
  });

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl md:text-4xl font-semibold my-8 text-center md:text-left">
        My Payment History:{" "}
        <span className="text-primary">{payments.length}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {payments.map((pay) => (
          <div
            key={pay._id}
            className="card bg-white shadow-lg border border-gray-200 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-xl text-primary">
                  {pay.packageName}
                </h3>
              </div>
              <span className="badge badge-secondary badge-md text-[15px] capitalize">
                {pay.paymentStatus}
              </span>
            </div>

            <div className="space-y-1 text-sm mb-4">
              <p>
                <strong>Paid on:</strong> {formatDateTime(pay.paidAt)}
              </p>
              <p>
                <strong>Cost:</strong>{" "}
                <span className="text-blue-600 font-bold">৳{pay.amount}</span>
              </p>
              <p className="truncate">
                <strong>Transaction ID:</strong> {pay.transactionId}
              </p>
              <p className="truncate">
                <strong>Tracking ID:</strong> {pay.trackingId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
