import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import CTA_bg from '../../assets/banner-1.png'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const Services = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
     
    useEffect(()=>{
      axiosSecure.get('/services')
      .then(res=>{
        setServices(res.data);
      })
    },[axiosSecure])

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
                <p className="text-gray-600 text-sm">{service.description.split('.')[0]}...</p>

                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  View Packages <BsArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

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
    </div>
  );
};

export default Services;