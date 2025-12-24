import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import CTA_bg from "../../assets/banner-1.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import useDefineRole from "../../hooks/useDefineRole";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Services = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const { startLoading, stopLoading } = useLoading();
  const { role } = useDefineRole();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const imgbbKey = import.meta.env.VITE_IMAGE_HOST_KEY;

  useEffect(() => {
    startLoading();
    axiosSecure.get("/services").then((res) => {
      setServices(res.data);
      stopLoading();
    });
  }, [axiosSecure]);

  const handleCreateService = async (e) => {
    e.preventDefault();

    const form = e.target;
    const imageFile = form.image.files[0];

    if (!imageFile) return;

    try {
      // 1️⃣ Upload image to imgbb
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imgbbData = await imgbbRes.json();
      const imageURL = imgbbData?.data?.display_url;

      // 2️⃣ Prepare service data
      const serviceData = {
        service_name: form.service_name.value,
        cost: Number(form.cost.value),
        unit: form.unit.value,
        category: form.category.value,
        description: form.description.value,
        image: imageURL,
        createdByEmail: user?.email,
        createdAt: new Date(),
      };

      // 3️⃣ Save to DB
      const res = await axiosSecure.post("/services", serviceData);

      if (res.data.insertedId) {
        setServices([...services, serviceData]);
        setOpenModal(false);
        form.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added a new Service",
          showConfirmButton: false,
          timer: 2222,
        });
      }
    } catch (error) {
      // console.error("Service creation failed:", error);
    }
  };

  return (
    <div className="py-10 md:py-11 lg:py-22">
      {/* Hero Section */}
      <title>Style Decor | Services</title>

      <section className="max-w-7xl mx-auto px-6 pb-11 text-center">
        <h1 className="text-2xl md:text-4xl font-semibold mb-4">
          Our Decoration Services
          <div className="border-b-5 border-[#577F84] max-w-55 mx-auto mt-5"></div>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          From intimate home setups to grand ceremonies, StyleDecor provides
          professional decoration services tailored to your vision.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.service_name}
                className="h-48 w-full object-cover"
              />

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">
                  {service.service_name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description.split(".")[0]}...
                </p>

                <Link to={`/packages?service=${service.service_name}`}>
                  <button className="btn btn-primary">
                    View Details & Packages <BsArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {role === "admin" && (
        <div className="mb-10 flex justify-center">
          <button
            className="btn bg-amber-200 text-black"
            onClick={() => setOpenModal(true)}
          >
            Create Service
          </button>
        </div>
      )}

      {/* Call To Action */}
      <section
        style={{
          backgroundImage: `url(${CTA_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="py-16 rounded-2xl text-white"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Decorate Your Special Moment?
          </h2>
          <p className="mb-8">
            Explore our packages or book a consultation to get started with
            StyleDecor today.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/packages" className="btn btn-primary">
              Explore Packages
            </Link>
            <Link to="/consultation" className="btn btn-outline">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Modal  */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <h3 className="text-xl font-semibold mb-4">Create New Service</h3>

            <form onSubmit={handleCreateService} className="space-y-4">
              <input
                name="service_name"
                type="text"
                placeholder="Service Name"
                className="input input-bordered bg-amber-100 w-full"
                required
              />

              <input
                name="cost"
                type="number"
                placeholder="Cost (BDT)"
                className="input input-bordered bg-amber-100 w-full"
                required
              />

              <input
                name="unit"
                type="text"
                placeholder="Unit (per sqft / per floor / per meter)"
                className="input input-bordered bg-amber-100 w-full"
                required
              />

              <select
                name="category"
                className="select select-bordered bg-amber-100 w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="home">Home</option>
                <option value="wedding">Wedding</option>
                <option value="office">Office</option>
                <option value="seminar">Seminar</option>
                <option value="meeting">Meeting</option>
              </select>

              <textarea
                name="description"
                placeholder="Service Description"
                className="textarea textarea-bordered bg-amber-100 w-full"
                rows={3}
                required
              />

              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-amber-100"
              />

              <input
                type="file"
                name="image"
                accept="image/*"
                className="file-input file-input-bordered bg-amber-100 w-full"
                required
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
