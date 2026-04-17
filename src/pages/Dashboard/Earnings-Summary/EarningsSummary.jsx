import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Wallet, Briefcase, TrendingUp } from "lucide-react";

const EarningsSummary = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["decoratorBookings", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?decoratorEmail=${user.email}`,
      );
      return res.data;
    },
  });

  // Calculate Data
  const completedBookings = useMemo(
    () => bookings.filter((b) => b.status === "completed"),
    [bookings],
  );

  const totalEarnings = completedBookings.reduce(
    (acc, b) => acc + (b.price || 0) * 0.75,
    0,
  );

  // Prepare Chart Data
  const chartData = completedBookings.map((b) => ({
    name:
      b.packageName.length > 10
        ? b.packageName.substring(0, 8) + "..."
        : b.packageName,
    earnings: (b.price || 0) * 0.75,
  }));

  if (isLoading || loading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="pb-10">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total Earnings
            </p>
            <p className="text-2xl font-black text-slate-800">
              ৳{totalEarnings.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Completed Projects
            </p>
            <p className="text-2xl font-black text-slate-800">
              {completedBookings.length}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 mb-8">
        <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
          <TrendingUp size={20} className="text-primary" />
          <h3>Earnings Trend (Per Project)</h3>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="earnings" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#3b82f6" : "#60a5fa"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">Project Details</th>
                <th>Status</th>
                <th>Booking Date</th>
                <th>Total Price</th>
                <th className="pr-8 text-right">My Earnings (75%)</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-slate-50/80 transition-colors border-b border-slate-50"
                >
                  <td className="py-4 pl-8">
                    <p className="font-bold text-slate-900">{b.packageName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      ID: {b.trackingId}
                    </p>
                  </td>
                  <td>
                    <span
                      className={`badge ${b.status === "completed" ? "badge-success text-white" : "badge-ghost"} badge-sm font-bold capitalize`}
                    >
                      {b.status.replace(/-/g, " ")}
                    </span>
                  </td>
                  <td className="text-xs">
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="font-bold text-slate-800">৳{b.price || 0}</td>
                  <td className="pr-8 text-right font-black text-primary">
                    ৳{(b.price || 0) * 0.75}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummary;
