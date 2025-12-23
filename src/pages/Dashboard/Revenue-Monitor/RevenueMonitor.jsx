import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Area, AreaChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart } from "lucide-react";

const RevenueMonitor = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6 space-y-8 bg-gray-50">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-2xl font-bold">Revenue Analytics</h2>
        <div className="text-right">
          <p className="text-gray-500 text-sm uppercase">Total Gross Revenue</p>
          <p className="text-3xl font-black text-indigo-600">
            ৳{stats.totalRevenue?.toLocaleString() || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* CHART 1: INCOME FLOW */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold mb-6 text-gray-700">Daily Income Flow</h3>
          {/* FIXED: The parent div now has a fixed height so ResponsiveContainer doesn't crash */}
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={stats.revenueHistory || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#4f46e5"
                  fill="#c7d2fe"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: SERVICE DEMAND */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold mb-6 text-gray-700">
            Service Demand Histogram
          </h3>
          {/* FIXED: Explicit height added here too */}
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={stats.serviceDemand || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueMonitor;