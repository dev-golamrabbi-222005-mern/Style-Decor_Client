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
    <div className="p-4 my-10 md:my-15 lg:my-22 rounded-xl">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-10">
        Our Popular Packages
      <div className="border-b-5 border-[#577F84] max-w-55 mx-auto mt-5"></div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="border-gray-300 border-2 p-4 rounded-lg shadow-2xl"
          >
            <img
              src={pkg.image}
              alt={`An unexpected error occurred while loading - ${pkg.package_name}`}
              className="rounded h-40 w-full object-cover"
            />
            <h3 className="font-bold mt-2">{pkg.package_name}</h3>
            <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
            <ul>
              <strong>Features:</strong>
              {pkg.features.map((f, i) => (
                <li key={i} className="list-disc ml-5">
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">
              Decorating Time: {pkg.delivery_time}
            </p>
            <div className="flex items-center my-3 text-lg">
              <span className="mr-2">Cost: </span>
              <p className="text-blue-600 font-semibold">৳{pkg.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-10">
        <Link to="/services">
          <button className="btn btn-primary">View all Services</button>
        </Link>
      </div>
    </div>
  );
};

export default PopularPacks;
