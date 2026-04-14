import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import L from "leaflet";

// --- FIXED: Leaflet Marker Issue ---
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
// ----------------------------------

const Coverage = () => {
  const axiosPublic = useAxiosPublic();
  const mapRef = useRef(null);
  const position = [23.685, 90.3563]; // Dhaka, Bangladesh

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
      cent.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district && mapRef.current) {
      mapRef.current.flyTo([district.latitude, district.longitude], 10);
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20 animate-pulse text-slate-400">
        Loading Map...
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-20 text-red-400">
        Error loading map data.
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-6">
      {/* Consistent Header */}
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-[0.3em] text-[#577F84] font-bold">
          Location
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-4 italic">
          We're Available Nationwide
        </h2>
        <div className="w-24 h-1 bg-[#577F84] mx-auto mt-6 rounded-full"></div>
        <p className="mt-6 text-slate-500 max-w-xl mx-auto">
          Serving all 64 districts with premium decoration services. Search for
          your district to see specific coverage.
        </p>
      </div>

      {/* Map Container with Floating Search */}
      <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl h-[600px] w-full group">
        {/* Floating Glassmorphism Search Bar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              name="location"
              placeholder="Search your district (e.g. Dhaka, Bogra...)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg focus:ring-2 focus:ring-[#577F84] outline-none text-slate-800"
              required
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#577F84]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>

        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
          ref={mapRef}
        >
          {/* Using a cleaner Map Style (CartoDB Positron) */}
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {coverageAreas.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <div className="p-1 font-sans">
                  <h4 className="text-[#577F84] font-bold text-lg border-b border-slate-100 pb-1 mb-2">
                    {center.district}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold block text-slate-400 uppercase tracking-tighter mb-1">
                      Covered Areas:
                    </span>
                    {center.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 p-4 rounded-xl shadow-md border border-slate-100 hidden md:block">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
            Service Status
          </p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-700 font-serif italic">
              Fully Operational
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
