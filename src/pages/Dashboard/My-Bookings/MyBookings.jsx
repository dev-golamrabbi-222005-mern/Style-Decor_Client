import {
  Calendar,
  MapPin,
  CreditCard,
  Trash2,
  Edit3,
  Filter,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);

  // States for Search, Filter, Sort, and Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "bookingDate",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  // --- Filtering & Sorting Logic ---
  const filteredAndSortedBookings = useMemo(() => {
    let result = [...bookings];

    // 1. Search Logic (by Package or Service Name)
    if (searchTerm) {
      result = result.filter(
        (bk) =>
          bk.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bk.serviceName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // 2. Filter Logic
    if (filterStatus !== "all") {
      result = result.filter((bk) => bk.status === filterStatus);
    }

    // 3. Sorting Logic
    result.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      if (sortConfig.key === "price") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }

      // Date sort
      return sortConfig.direction === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    });

    return result;
  }, [bookings, searchTerm, filterStatus, sortConfig]);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedBookings.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredAndSortedBookings.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (isLoading || loading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

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

        if (res.data.modifiedCount > 0) {
          refetch();

          Swal.fire("Updated!", "Booking updated successfully.", "success");

          setSelectedBooking(null);

          document.getElementById("detailsModal").checked = false; // This closes the daisyUI modal
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
    }).then(async (result) => {
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return "badge-success text-white";
      case "pending":
        return "badge-warning text-white";
      case "cancelled":
        return "badge-error text-white";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="pb-10">
      {/* --- Section 1: Stats Header --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">
              Total Bookings
            </p>
            <p className="text-xl font-black">{bookings.length}</p>
          </div>
        </div>
      </div>

      {/* --- Section 2: Search & Filter Bar --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
        <div className="relative flex-1">
          <Search className="z-10 top-2.5 left-2.5 absolute" size={22} />
          <input
            type="text"
            placeholder="Search by package name..."
            className="input input-bordered pl-10 w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
            
        <select
          className="select select-bordered bg-slate-50 border-none"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => requestSort("price")}
            className={`btn btn-sm ${sortConfig.key === "price" ? "btn-primary" : "btn-ghost bg-slate-50 text-black"}`}
          >
            Price <ArrowUpDown size={14} />
          </button>
          <button
            onClick={() => requestSort("bookingDate")}
            className={`btn btn-sm ${sortConfig.key === "bookingDate" ? "btn-primary" : "btn-ghost bg-slate-50 text-black"}`}
          >
            Date <ArrowUpDown size={14} />
          </button>
        </div>
      </div>

      {/* --- Section 3: Data Table --- */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">Package & Service</th>
                <th>Details</th>
                <th className="text-center">Status</th>
                <th className="text-center">Payment</th>
                <th className="pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {currentItems.map((bk) => (
                <tr
                  key={bk._id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-5 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex w-10 h-10 rounded-xl bg-primary/10 items-center justify-center text-primary font-bold">
                        {bk.packageName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">
                          {bk.packageName}
                        </p>
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          {bk.serviceName}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Calendar size={12} /> {bk.bookingDate}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin size={12} /> {bk.location}
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    <span
                      className={`badge capitalize badge-sm font-bold p-3 border-none ${getStatusBadge(bk.status)}`}
                    >
                      {formatStatus(bk.status)}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-slate-800">
                        ৳{bk.price}
                      </span>
                      {bk.paymentStatus === "Paid" ? (
                        <span className="text-[9px] text-green-500 font-black uppercase tracking-tighter">
                          Verified
                        </span>
                      ) : (
                        <span className="text-[9px] text-red-400 font-black uppercase tracking-tighter italic">
                          Pending
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="pr-8 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bk.status !== "cancelled" &&
                        bk.paymentStatus !== "Paid" && (
                          <label
                            htmlFor="detailsModal"
                            className="btn tooltip btn-ghost btn-sm text-primary hover:bg-primary/10"
                            data-tip="Update Booking"
                            onClick={() => setSelectedBooking(bk)}
                          >
                            <Edit3 size={16} />
                          </label>
                        )}

                      {bk.paymentStatus !== "Paid" && (
                        <Link
                          to={`/dashboard/payment-checkout/${bk._id}`}
                          className="btn tooltip btn-ghost btn-sm text-green-500 hover:bg-green-50"
                          data-tip="Proceed to Pay"
                        >
                          <CreditCard size={16} />
                        </Link>
                      )}

                      <button
                        onClick={() => handleBookingDelete(bk._id)}
                        disabled={
                          bk.status === "cancelled" ||
                          bk.paymentStatus === "Paid"
                        }
                        className="btn tooltip btn-ghost btn-sm text-red-400 hover:bg-red-50"
                        data-tip="Delete Booking"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* --- Section 4: Pagination --- */}
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <p className="text-sm text-slate-500 font-medium">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredAndSortedBookings.length)} of{" "}
            {filteredAndSortedBookings.length} entries
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

        {filteredAndSortedBookings.length === 0 && (
          <div className="p-20 text-center text-slate-400 italic">
            No bookings match your search.
          </div>
        )}
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