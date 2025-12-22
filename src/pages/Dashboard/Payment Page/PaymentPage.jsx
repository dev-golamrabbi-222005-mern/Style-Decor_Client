import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Package,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  Truck,
  FileText,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: booking,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${bookingId}`);
      console.log(res.data);
      
      return res.data;
    },
  });

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading booking
          </h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-10">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-700">
            booking Not Found
          </h2>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    const paymentInfo = {
      price: booking.price,
      bookingId: booking._id,
      userEmail: booking.userEmail,
      packageName: booking.packageName,
    };
    console.log(paymentInfo);
    
    try {
      const res = await axiosSecure.post(
        "/StyleDecor-checkout-session",
        paymentInfo
      );
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment error full:", error);
      console.error("Response:", error.response?.data);
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 my-6 md:my-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Payment Checkout
        </h1>
        <p className="text-gray-600">
          Review your booking details and complete the payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Information */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Booking Information
              </h2>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Package Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {booking.packageName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="text-lg font-semibold text-gray-800">
                  {booking.serviceName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Booking Date</p>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.bookingDate}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Event Location</p>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.location}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Booked By</p>
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4" />
                  <span>{booking.userName}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  <span>{booking.userEmail}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Booking Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === "pendingToPay"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status === "pendingToPay"
                    ? "Pending To Pay"
                    : booking.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="text-2xl font-bold text-primary">
                  ৳ {booking.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary - Right Side (Sticky) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <CreditCard className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Summary
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Package Name</span>
                <span className="font-medium text-gray-800">
                  {booking.packageName}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">
                    Total Amount
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    {booking.price} ৳
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-500 hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                🔒 Secure payment powered by Stripe
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                ⏰ Pickup Time: 4pm–7pm approx.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={() => navigate(-1)} className="btn btn-primary w-55">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
