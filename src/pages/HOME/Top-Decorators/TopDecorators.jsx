import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TopDecorators = () => {
  const axiosPublic = useAxiosPublic();

  // React Query for fetching top decorators
const {
  data: decorators = [],
  isLoading,
  isError,
} = useQuery({
  queryKey: ["top-decorators"],
  queryFn: async () => {
    const res = await axiosPublic.get("/decorators/top");
    return res.data;
  },
});


  if (isLoading) {
    return (
      <div className="text-center py-20">
        <p>Loading top decorators...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p>Failed to load decorators. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-semibold">
          Our Top Decorators
        </h2>
        <div className="border-b-5 border-[#577F84] max-w-55 mx-auto mt-5"></div>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Meet our most experienced and trusted decorators who bring creativity
          and elegance to every event.
        </p>
      </div>

      {/* Decorators Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {decorators.map((decorator) => (
          <div
            key={decorator._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center"
          >
            <img
              src={decorator.photoURL}
              alt={decorator.displayName}
              className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-primary"
            />

            <h3 className="text-xl font-semibold mt-4">
              {decorator.displayName}
            </h3>

            <p className="text-gray-500 text-sm">
              {decorator.experience}+ years experience
            </p>

            {/* Contact info */}
            <p className="text-gray-700 text-sm mt-2">
              Email: {decorator.email}
            </p>

            <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-green-100 text-green-700">
              Active Decorator
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDecorators;
