import { FaUserFriends, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100">
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </p>
      <h3 className="text-2xl font-bold mt-1 text-gray-900">{value || 0}</h3>
    </div>
    <div className={`p-4 rounded-xl bg-gray-50 ${color} text-2xl`}>{icon}</div>
  </div>
);

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-ops-stats"],
    queryFn: async () => {
      // Matches the backend route name exactly
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="p-10 text-center">Loading Dashboard...</div>;

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800">Operational Overview</h2>

      {/* --- STAT CARDS (Removed Pending Apps) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={<FaUserFriends />}
          color="text-blue-600"
        />
        <StatCard
          title="Total Packages"
          value={stats.packages}
          icon={<FaClipboardList />}
          color="text-indigo-600"
        />
        <StatCard
          title="Total Services"
          value={stats.services}
          icon={<FaCheckCircle />}
          color="text-teal-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* --- PIE CHART --- */}
        <div className="bg-white p-6 rounded-xl border h-[450px]">
          <h3 className="font-bold mb-4 text-gray-500 uppercase text-sm">
            System User Distribution
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={stats.userDistribution || []}
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label
              >
                {stats.userDistribution?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* --- COVERAGE AREAS --- */}
        <div className="bg-white p-6 rounded-xl border h-[450px] overflow-hidden flex flex-col">
          <h3 className="font-bold mb-4 text-gray-500 uppercase text-sm">
            Active Coverage Areas
          </h3>
          <div className="space-y-3 overflow-y-auto">
            {stats.coverageAreas?.map((area) => (
              <div
                key={area._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="font-medium text-gray-700">{area.name}</span>
                <span className="badge badge-success badge-outline">
                  Operational
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
