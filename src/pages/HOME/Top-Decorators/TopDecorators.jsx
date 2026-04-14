import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TopDecorators = () => {
  const axiosPublic = useAxiosPublic();

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

  // Modern Skeleton Loader for a smoother UX
  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-slate-50 h-80 rounded-[2rem] animate-pulse"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24">
        <div className="bg-red-50 text-red-500 inline-block px-6 py-3 rounded-full font-medium">
          Failed to load decorators. Please refresh.
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6">
      {/* Consistent Header Style */}
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-[0.3em] text-[#577F84] font-bold">
          The Experts
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-4 italic">
          Our Top Decorators
        </h2>
        <div className="w-24 h-1 bg-[#577F84] mx-auto mt-6 rounded-full"></div>
        <p className="text-slate-500 mt-6 max-w-2xl mx-auto leading-relaxed">
          Meet the creative visionaries who transform spaces into experiences.
        </p>
      </div>

      {/* Decorators Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {decorators.map((decorator) => (
          <div
            key={decorator._id}
            className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-[#577F84]/10 hover:-translate-y-2"
          >
            {/* Image with "Online" Status */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#577F84] animate-[spin_10s_linear_infinite] group-hover:border-solid"></div>
              <img
                src={decorator.photoURL}
                alt={decorator.displayName}
                className="w-28 h-28 absolute top-2 left-2 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-slate-800 tracking-tight">
                {decorator.displayName}
              </h3>
              <p className="text-[#577F84] font-bold text-xs uppercase tracking-widest mt-1">
                {decorator.experience} Years of Excellence
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50">
              <p className="text-slate-400 text-sm italic mb-4">
                {decorator.email}
              </p>
              <button className="w-full py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDecorators;
