import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import {
  Search,
  ArrowUpDown,
  Calendar,
  CreditCard,
  Hash,
  CheckCircle,
  Filter,
  Download,
} from "lucide-react";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // States for Search, Sort, and Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "paidAt",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
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

  // --- Filtering & Sorting Logic ---
  const filteredAndSortedPayments = useMemo(() => {
    let result = [...payments];

    // 1. Search Logic (by Package Name or Transaction ID)
    if (searchTerm) {
      result = result.filter(
        (pay) =>
          pay.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pay.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // 2. Sorting Logic
    result.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }

      // Date sort (paidAt)
      return sortConfig.direction === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    });

    return result;
  }, [payments, searchTerm, sortConfig]);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedPayments.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredAndSortedPayments.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (isLoading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="pb-10">
      {/* --- Section 1: Stats Header --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">
              Success Payments
            </p>
            <p className="text-xl font-black">{payments.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">
              Total Spent
            </p>
            <p className="text-xl font-black">
              ৳{payments.reduce((acc, curr) => acc + curr.amount, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* --- Section 2: Search & Sort Bar --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 z-10" size={18} />
          <input
            type="text"
            placeholder="Search by Package or Transaction ID..."
            className="input input-bordered pl-10 w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => requestSort("amount")}
            className={`btn btn-sm ${sortConfig.key === "amount" ? "btn-primary" : "btn-ghost bg-slate-50 text-black"}`}
          >
            Amount <ArrowUpDown size={14} />
          </button>
          <button
            onClick={() => requestSort("paidAt")}
            className={`btn btn-sm ${sortConfig.key === "paidAt" ? "btn-primary" : "btn-ghost bg-slate-50 text-black"}`}
          >
            Date <ArrowUpDown size={14} />
          </button>
        </div>
      </div>

      {/* --- Section 3: Data Table --- */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-none">
            <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">Package Name</th>
                <th>Transaction Details</th>
                <th className="text-center">Paid Amount</th>
                <th className="text-center">Status</th>
                <th className="pr-8 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {currentItems.map((pay) => (
                <tr
                  key={pay._id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-5 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 font-bold">
                        <CreditCard size={18} />
                      </div>
                      <p className="font-bold text-slate-900 leading-tight">
                        {pay.packageName}
                      </p>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Calendar size={12} className="text-slate-400" />{" "}
                        {formatDateTime(pay.paidAt)}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Hash size={12} /> ID:{" "}
                        <span className="font-mono">{pay.transactionId}</span>
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    <span className="text-sm font-black text-slate-800">
                      ৳{pay.amount}
                    </span>
                  </td>

                  <td className="text-center">
                    <span className="badge badge-success badge-sm font-bold text-white p-3 border-none capitalize">
                      {pay.paymentStatus}
                    </span>
                  </td>

                  <td className="pr-8 text-right">
                    <div
                      className="tooltip tooltip-left"
                      data-tip="Download Receipt"
                    >
                      <button className="btn btn-ghost btn-sm text-primary hover:bg-primary/10">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Section 4: Pagination --- */}
        {filteredAndSortedPayments.length > 0 ? (
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
            <p className="text-sm text-slate-500 font-medium">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredAndSortedPayments.length)} of{" "}
              {filteredAndSortedPayments.length} payments
            </p>
            <div className="join shadow-sm">
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
                  className={`join-item btn btn-sm ${currentPage === i + 1 ? "btn-primary border-primary" : "bg-white border-slate-200"}`}
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
        ) : (
          <div className="p-20 text-center text-slate-400 italic">
            No payment history matches your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
