import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Coverage = () => {
  const axiosPublic = useAxiosPublic();
  const mapRef = useRef(null);
  const position = [23.685, 90.3563]; // Dhaka, Bangladesh

  // Fetch coverage areas with React Query
  const {
    data: coverageAreas = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coverage-areas"],
    queryFn: async () => {
      const res = await axiosPublic.get("/coverageAreas");
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = coverageAreas.find((cent) =>
      cent.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district && mapRef.current) {
      mapRef.current.flyTo([district.latitude, district.longitude], 11);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading coverage areas...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        Failed to load coverage areas. Please try again later.
      </div>
    );
  }

  return (
    <div className="my-5 md:my-10 lg:my-15">
      <h1 className="text-2xl md:text-4xl font-semibold text-center">
        We are available in 64 districts
      </h1>
      <div className="border-b-5 border-[#577F84] max-w-55 mx-auto mt-5"></div>
      <div className="border-b-2 border-[#577F84] pb-10">
        <form
          className="flex items-center justify-center pt-8"
          onSubmit={handleSearch}
        >
          <label className="input bg-white">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              name="location"
            />
          </label>
        </form>
      </div>
      <div className="h-[777px] w-full pt-11 border-b-2 border-[#577F84] pb-11">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coverageAreas.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area:{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
