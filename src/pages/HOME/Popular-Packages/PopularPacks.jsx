import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PopularPacks = () => {
  const axiosPublic = useAxiosPublic();
  const [packages, setPackages] = useState([]);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    axiosPublic.get("/popular-packages").then((res) => {
      setPackages(res.data);
      stopLoading();
    });
  }, [axiosPublic]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="text-sm uppercase tracking-[0.3em] text-[#577F84] font-bold">
          Trending
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-4 italic">
          Our Popular Packages
        </h2>
        <div className="w-24 h-1 bg-[#577F84] mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-64">
              <img
                src={pkg.image}
                alt={pkg.package_name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
                <p className="text-[#577F84] font-bold text-sm">৳{pkg.price}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-slate-800 group-hover:text-[#577F84] transition-colors duration-300">
                {pkg.package_name}
              </h3>

              <p className="text-slate-500 text-sm mt-3 leading-relaxed line-clamp-2">
                {pkg.description}
              </p>

              {/* Features as Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {pkg.features.slice(0, 3).map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-50 text-slate-600 text-[11px] uppercase tracking-wider font-medium rounded-md border border-slate-100"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Divider & Footer */}
              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold tracking-tighter">
                    EST. TIME
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {pkg.delivery_time}
                  </span>
                </div>

                <Link
                  to={`/package/${pkg._id}`}
                  className="text-sm font-bold text-[#577F84] hover:underline underline-offset-4"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-16">
        <Link to="/services">
          <button className="px-10 py-4 bg-[#577F84] text-white font-bold rounded-full hover:bg-[#46666a] transform hover:-translate-y-1 transition-all shadow-lg shadow-[#577F84]/20 uppercase tracking-widest text-xs">
            Explore All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularPacks;
