import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const EarningsSummary = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all bookings assigned to the decorator
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["decoratorBookings", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?decoratorEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading || loading)
    return <div className="text-center py-20">Loading earnings...</div>;

  // Calculate total earnings and completed projects
const completedBookings = bookings.filter((b) => b.status === "completed");
const totalEarnings = completedBookings.reduce(
  (acc, b) => acc + (b.price || 0) * 0.75,
  0
);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8 text-center">
        Earnings Summary
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p className="text-3xl font-bold mt-2">৳{totalEarnings}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold">Completed Projects</h2>
          <p className="text-3xl font-bold mt-2">{completedBookings.length}</p>
        </div>
      </div>

      {/* Project List */}
      {
        completedBookings.length >= 1 && (
      <div className="overflow-x-auto bg-amber-100 p-5 rounded-2xl">
        <table className="table w-full border border-gray-300 bg-white rounded-lg">
          <thead className="bg-gray-100 text-black">
            <tr className="border-b-2 bogr">
              <th>Tracking ID</th>
              <th>Client</th>
              <th>Package</th>
              <th>Date</th>
              <th>Price (৳)</th>
              <th>Status</th>
              <th>Earning (৳) [75%]</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr
                key={b._id}
                className="hover:bg-gray-50 border-b-2 border-gray-300"
              >
                <td>{b.trackingId}</td>
                <td>{b.userName}</td>
                <td>{b.packageName}</td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td>{b.price || 0}</td>
                <td className="capitalize">{b.status.replace(/-/g, " ")}</td>
                <td>{(b.price || 0) * 0.75}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        )
      }
    </div>
  );
};

export default EarningsSummary;
