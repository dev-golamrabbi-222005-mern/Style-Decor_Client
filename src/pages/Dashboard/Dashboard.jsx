import {
  FaUserFriends,
  FaClipboardList,
  FaCheckCircle,
  FaStar,
  FaHistory,
  FaWallet,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDefineRole from "../../hooks/useDefineRole";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// --- REUSABLE STAT CARD ---
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100">
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
      <h3 className="text-2xl font-bold mt-1 text-gray-900">{value || 0}</h3>
    </div>
    <div className={`p-4 rounded-xl bg-gray-50 ${color} text-2xl`}>{icon}</div>
  </div>
);

// --- 1. ADMIN VIEW ---
const AdminView = ({ stats }) => {
  const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Population"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border h-96">
          <h3 className="font-bold mb-4 text-gray-500 uppercase text-sm">
            System Distribution
          </h3>
          <ResponsiveContainer width="100%" height="88%">
            <PieChart>
              <Pie
                data={stats.userDistribution}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                nameKey="name"
                label
              >
                {stats.userDistribution?.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl border h-[400px] overflow-y-auto">
          <h3 className="font-bold mb-4 text-gray-500 uppercase text-sm">
            Coverage
          </h3>
          {stats.coverageAreas?.map((area) => (
            <div
              key={area._id}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>{area.district}</span>
              <span className="text-green-600 font-bold">● Active</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// --- 2. DECORATOR VIEW ---
const DecoratorView = ({ stats }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Assigned Jobs"
        value={stats.myJobs}
        icon={<FaClipboardList />}
        color="text-orange-600"
      />
      <StatCard
        title="Completed"
        value={stats.completed}
        icon={<FaCheckCircle />}
        color="text-green-600"
      />
      <StatCard
        title="Avg Rating"
        value="4.9"
        icon={<FaStar />}
        color="text-yellow-500"
      />
    </div>
    <div className="bg-white p-8 rounded-2xl border text-center">
      <h3 className="text-3xl font-bold">Welcome back, Decorator!</h3>
      <p className="text-gray-500 mt-2">
        You have {stats.pending} jobs waiting for action today.
      </p>
      <button className="btn btn-primary mt-4">View My Schedule</button>
    </div>
  </div>
);

// --- 3. USER VIEW ---
const UserView = ({ stats }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard
        title="My Bookings"
        value={stats.myBookings}
        icon={<FaHistory />}
        color="text-blue-600"
      />
      <StatCard
        title="Total Spent"
        value={`৳${stats.spent?.toLocaleString()}`}
        icon={<FaWallet />}
        color="text-purple-600"
      />
    </div>
    <div className="bg-primary p-8 rounded-2xl text-white shadow-lg max-w-3xl mx-auto text-center">
      <h3 className="text-2xl font-bold">Ready for a new look?</h3>
      <p className="opacity-90 mt-2">
        Book your next decoration and get 10% off using code 'STYLE01'
      </p>
      <Link to="/services">
        <button className="btn btn-secondary mt-4 bg-white text-indigo-600 border-none">
          Browse Services
        </button>
      </Link>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const Dashboard = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const { role, isLoading, loading } = useDefineRole();
  const {
    data: stats = {},
    isLoading: isDataLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard-stats", role, user?.email],
    enabled: !loading && !isLoading && !!role && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-stats?role=${role}`);
      return res.data;
    },
    retry: 1,
  });

  if (isLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-500">Verifying session and role...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500">
          Session expired. Please refresh or log in again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-sm mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isDataLoading) {
    return (
      <div className="p-10 text-center animate-pulse">
        Loading {role} Workspace...
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      <header className="mb-10 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-800">
          {role === "admin"
            ? "System Overview"
            : role === "decorator"
            ? "Decorator Portal"
            : "My Dashboard"}
        </h2>
        <p className="text-gray-500 capitalize">Logged in as {role}</p>
      </header>

      {/* CONDITIONAL RENDERING BASED ON HOOK ROLE */}
      {role === "admin" && <AdminView stats={stats} />}
      {role === "decorator" && <DecoratorView stats={stats} />}
      {role === "user" && <UserView stats={stats} />}

      {/* Fallback if role is undefined or doesn't match */}
      {!["admin", "decorator", "user"].includes(role) && (
        <div className="text-center p-20 bg-white rounded-2xl border">
          <h3 className="text-xl font-semibold">Account Setup In Progress</h3>
          <p className="text-gray-500">
            We are finalizing your account permissions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
