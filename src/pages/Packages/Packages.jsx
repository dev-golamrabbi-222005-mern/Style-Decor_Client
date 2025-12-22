import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useLoading from "../../hooks/useLoading";
import useAuth from "../../hooks/useAuth"; // Assuming you have an Auth hook
import Swal from "sweetalert2"; // For nice alerts
import toast from "react-hot-toast";

const Packages = () => {
  const [searchParams] = useSearchParams();
  const serviceName = searchParams.get("service");
  const [packages, setPackages] = useState([]);
  const [serviceInfo, setServiceInfo] = useState(null);

  // --- New States for Booking ---
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  
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
            (s) => s.service_name === serviceName
          );
          setServiceInfo(singleService);
          stopLoading();
        })
        .catch(() => stopLoading());
    }
  }, [serviceName, axiosSecure]);

  const handleBookingClick = (pkg) => {
    if (user && user.email) {
      // User is logged in, show the modal
      setSelectedPackage(pkg);
    } else {
      toast.error('Sorry, You have to login first to book a package.')
      navigate("/auth/login", { state: { from: location } });
    }
  };

  // --- Form Submission Logic ---
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const bookingDate = form.date.value;
    const location = form.location.value;

    const bookingData = {
      userEmail: user?.email,
      userName: user?.displayName,
      serviceName: serviceInfo?.service_name,
      packageName: selectedPackage?.package_name,
      price: selectedPackage?.price,
      bookingDate,
      location,
      status: "pendingToPay",
      paymentStatus: 'unPaid'
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your booking has been placed. Please Pay now.", "success");
        setSelectedPackage(null); // Close modal
        navigate('/dashboard/my-bookings');
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    }
  };

  return (
    <div className="p-10 container mx-auto">
      {/* Service Info Section (Unchanged) */}
      {serviceInfo && (
        <div className="mb-12 border-b pb-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img
                src={serviceInfo.image}
                alt={serviceInfo.service_name}
                className="rounded-2xl shadow-2xl w-full h-[300px] object-cover"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-primary">
                {serviceInfo.service_name}
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                {serviceInfo.description}
              </p>
              <div className="badge badge-outline p-4 text-sky-400">
                Premium {serviceInfo.service_name} Solutions
              </div>
              <p className="text-lg">
                <strong>Cost:</strong> {serviceInfo.unit} - ৳{serviceInfo.cost}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-6">
        Available Packages
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
            {/* Open Modal on Click */}
            <button
              onClick={() => handleBookingClick(pkg)}
              className="btn btn-primary w-full"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* --- BOOKING MODAL --- */}
      {selectedPackage && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg bg-white">
            <h3 className="font-bold text-2xl text-center mb-4 text-primary">
              Confirm Booking
            </h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered bg-gray-100"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email</span>
                  </label>
                  <input
                    type="text"
                    value={user?.email}
                    readOnly
                    className="input input-bordered bg-gray-100"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Package Selected</span>
                </label>
                <input
                  type="text"
                  value={`${serviceInfo?.service_name} - ${selectedPackage.package_name}`}
                  readOnly
                  className="input input-bordered ml-2 bg-gray-100 font-semibold"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Booking Date*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="input input-bordered bg-gray-100 ml-5 border-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Event Location*</span>
                </label>
                <textarea
                  name="location"
                  required
                  className="textarea textarea-bordered border-primary bg-gray-100 ml-3"
                  placeholder="Full address of the venue"
                ></textarea>
              </div>

              <div className="text-lg font-bold py-2 text-center">
                Total Price:{" "}
                <span className="text-blue-600">৳{selectedPackage.price}</span>
              </div>

              <div className="modal-action flex justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="btn btn-ghost border-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-8">
                  Confirm & Book
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
