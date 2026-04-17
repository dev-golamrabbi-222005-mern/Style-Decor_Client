import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useDefineRole from "../../../hooks/useDefineRole";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FaWallet,
  FaArrowTrendUp,
  FaChartPie,
  FaCalendarCheck,
} from "react-icons/fa6";

const RevenueMonitor = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    role,
    isLoading: isRoleLoading,
    loading: authLoading,
  } = useDefineRole();

  const {
    data: stats = {},
    isLoading: isDataLoading,
    isError,
  } = useQuery({
    queryKey: ["revenue-stats"],
    enabled: !authLoading && !isRoleLoading && !!role && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/revenue-stats");
      return res.data;
    },
    retry: 1,
  });

  if (isRoleLoading || authLoading || isDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-slate-400 animate-pulse font-medium">
          Analyzing financial data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-red-50 p-6 rounded-full mb-4">
          <FaWallet className="text-red-400 text-3xl" />
        </div>
        <p className="text-slate-600 font-bold">Failed to load analytics.</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-outline btn-sm mt-4 rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pb-10 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-800 tracking-tight">
            Revenue of Style Decor
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Real-time financial performance and service demand insights
          </p>
        </div>
        <div className="bg-primary px-6 py-3 rounded-[1.5rem] text-white text-center shadow-xl shadow-indigo-200">
          <p className="text-[10px] uppercase font-black opacity-70 tracking-widest">
            Gross Revenue
          </p>
          <p className="text-2xl font-black">
            ৳{stats.totalRevenue?.toLocaleString() || 0}
          </p>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg. Daily Income"
          value={`৳${Math.round(stats.totalRevenue / 30 || 0)}`}
          icon={<FaArrowTrendUp />}
          color="text-emerald-500"
          bg="bg-emerald-50"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings || 0}
          icon={<FaCalendarCheck />}
          color="text-blue-500"
          bg="bg-blue-50"
        />
        <StatCard
          title="Top Service"
          value={stats.serviceDemand?.[0]?.name || "N/A"}
          icon={<FaChartPie />}
          color="text-amber-500"
          bg="bg-amber-50"
        />
        <StatCard
          title="Growth Rate"
          value="+12.5%"
          icon={<FaArrowTrendUp />}
          color="text-indigo-500"
          bg="bg-indigo-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CHART 1: INCOME FLOW */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="mb-6">
            <h3 className="font-black text-slate-800 text-lg">
              Revenue Stream
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Daily income fluctuations for the current month
            </p>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={stats.revenueHistory || []}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAmt)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: SERVICE DEMAND */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="mb-6">
            <h3 className="font-black text-slate-800 text-lg">
              Service Popularity
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Distribution of bookings across categories
            </p>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={stats.serviceDemand || []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ borderRadius: "16px", border: "none" }}
                />
                <Bar
                  dataKey="bookings"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
    <div className={`p-4 ${bg} ${color} rounded-2xl text-xl`}>{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
        {title}
      </p>
      <p className="text-xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default RevenueMonitor;
