import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useLoading from "../../hooks/useLoading";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Packages = () => {
  const [searchParams] = useSearchParams();
  const serviceName = searchParams.get("service");
  const [packages, setPackages] = useState([]);
  const [serviceInfo, setServiceInfo] = useState(null);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Changed to 6 for better grid symmetry

  useEffect(() => {
    startLoading();
    if (serviceName) {
      axiosSecure
        .get(`/packages?service=${encodeURIComponent(serviceName)}`)
        .then((res) => setPackages(res.data));

      axiosSecure
        .get("/services")
        .then((res) => {
          const singleService = res.data.find(
            (s) => s.service_name === serviceName,
          );
          setServiceInfo(singleService);
          stopLoading();
        })
        .catch(() => stopLoading());
    }
  }, [serviceName, axiosSecure]);

  const handleBookingClick = (pkg) => {
    if (user?.email) {
      setSelectedPackage(pkg);
    } else {
      toast.error("Please login to book this package.");
      navigate("/auth/login", { state: { from: location } });
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const bookingDate = form.date.value;
    const eventLocation = form.location.value;

    const bookingData = {
      userEmail: user?.email,
      userName: user?.displayName,
      serviceName: serviceInfo?.service_name,
      packageName: selectedPackage?.package_name,
      price: selectedPackage?.price,
      bookingDate,
      location: eventLocation,
      status: "pendingToPay",
      paymentStatus: "unPaid",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booking Placed!",
          text: "Redirecting to your dashboard for payment.",
          showConfirmButton: false,
          timer: 2000,
        });
        setSelectedPackage(null);
        navigate("/dashboard/my-bookings");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to place booking. Try again.", "error");
    }
  };

  const filteredPackages = packages
    .filter((pkg) =>
      pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((pkg) => {
      if (filterPrice === "low") return pkg.price < 50000;
      if (filterPrice === "mid")
        return pkg.price >= 50000 && pkg.price <= 100000;
      if (filterPrice === "high") return pkg.price > 100000;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "priceLow") return a.price - b.price;
      if (sortOption === "priceHigh") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPackages = filteredPackages.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      {/* --- HERO SECTION --- */}
      {serviceInfo && (
        <div className="relative overflow-hidden rounded-3xl mb-16">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 w-full h-[400px]">
              <img
                src={serviceInfo.image}
                alt={serviceInfo.service_name}
                className="w-full h-full object-cover rounded-xl shadow-xl"
              />
            </div>
            <div className="lg:w-1/2 w-full p-8 md:p-12 space-y-6">
              <div className="badge badge-primary badge-outline px-4 py-3 uppercase tracking-widest text-xs font-bold">
                Premium Decor
              </div>
              <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight">
                {serviceInfo.service_name}
              </h1>
              <p className="text-lg opacity-80 leading-relaxed max-w-lg">
                {serviceInfo.description}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="p-4 rounded-2xl">
                  <p className="uppercase opacity-50 font-bold">Base Pricing</p>
                  <p className="text-3xl font-bold text-primary">
                    ৳{serviceInfo.cost}{" "}
                    <span className="text-lg font-normal opacity-70">
                      /{serviceInfo.unit}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FILTER & SEARCH BAR --- */}
      <div className="p-4 mb-12 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3 flex-grow">
          <select
            className="bg-gray-300/30 py-4 px-8 rounded-2xl backdrop-blur-lg shadow-sm"
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="low">Budget (Below 50k)</option>
            <option value="mid">Standard (50k – 100k)</option>
            <option value="high">Luxury (Above 100k)</option>
          </select>

          <select
            className="bg-gray-300/30 py-4 px-8 rounded-2xl backdrop-blur-lg shadow-sm"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort: Recommended</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search premium packages..."
            className="bg-gray-300/30 py-4 px-8 rounded-2xl backdrop-blur-lg shadow-sm w-full pr-10"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-4 opacity-30">🔍</span>
        </div>
      </div>

      {/* --- PACKAGES GRID --- */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif italic mb-2">
          Curated Experience Packages
        </h2>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedPackages.map((pkg, index) => (
          <div
            key={index}
            className="group flex flex-col rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.package_name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 badge badge-secondary backdrop-blur-xl shadow-xl text-lg border-none text-white py-4 px-5">
                ৳{pkg.price}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow space-y-4">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {pkg.package_name}
              </h3>
              <p className="text-sm opacity-70 line-clamp-2">
                {pkg.description}
              </p>

              <div className="bg-base-200/20 rounded-xl p-4 flex-grow">
                <p className="text-xs font-bold uppercase opacity-40 mb-2">
                  Inclusions
                </p>
                <ul className="text-sm space-y-1">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">✦</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-xs">
                  <p className="opacity-50 uppercase font-bold">Timeline</p>
                  <p className="font-semibold">{pkg.delivery_time}</p>
                </div>
                <button
                  onClick={() => handleBookingClick(pkg)}
                  className="btn btn-primary btn-md rounded-xl border-none
             shadow-lg shadow-primary/20 
             transition-all duration-300 ease-out
             hover:scale-105 hover:-translate-y-1 
             hover:shadow-2xl hover:shadow-primary/40 
             hover:brightness-110
             active:scale-95 active:translate-y-0"
                >
                  Book Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- PAGINATION --- */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-16 join">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => {
                setCurrentPage(num + 1);
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className={`join-item btn btn-md ${
                currentPage === num + 1 ? "btn-primary px-8" : "btn-ghost"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}

      {/* --- MODERN BOOKING MODAL --- */}
      {selectedPackage && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="bg-[#577084]/50 max-w-2xl rounded-3xl p-0 overflow-hidden shadow-2xl border border-gray-500">
            <div className="bg-primary p-6 text-primary-content">
              <h3 className="font-black text-2xl uppercase tracking-tight italic">
                Secure Your Event
              </h3>
              <p className="opacity-80 text-sm">
                Review your selection and provide venue details
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase opacity-50 ml-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered bg-[#577084]/50 text-white w-full font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase opacity-50 ml-1">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={user?.email}
                    readOnly
                    className="input input-bordered bg-[#577084]/50 text-white w-full opacity-70"
                  />
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase text-primary">
                    Service Selection
                  </p>
                  <p className="font-bold text-white text-lg">
                    {serviceInfo?.service_name} — {selectedPackage.package_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-primary">
                    Investment
                  </p>
                  <p className="font-black text-xl text-primary">
                    ৳{selectedPackage.price}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-60">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="input input-bordered focus:border-primary bg-[#577084]/50 text-white border-2"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-60">
                    Venue Location *
                  </label>
                  <input
                    name="location"
                    placeholder="e.g. Grand Ballroom, Dhaka"
                    required
                    className="input bg-[#577084]/50 text-white input-bordered focus:border-primary border-2"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="btn btn-ghost flex-1 rounded-xl outline-1"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-[2] rounded-xl shadow-xl shadow-primary/30"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
