/* =====================================================
   COMMON HOME PAGE COMPONENTS – STYLEDECOR
   These components are reusable and appear on Home Page
===================================================== */

import { Link } from "react-router-dom";
import { BsCheckCircleFill, BsStarFill } from "react-icons/bs";

/* ================== FEATURE HIGHLIGHTS ================== */
export const FeatureHighlights = () => {
  const features = [
    "Easy Online Booking",
    "Professional Decorators",
    "On-site & In-studio Services",
    "Transparent Pricing",
    "Real-time Service Tracking",
    "Secure Online Payments",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose StyleDecor
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl"
            >
              <BsCheckCircleFill className="text-primary text-xl mt-1" />
              <p className="text-gray-700 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================== HOW IT WORKS ================== */
export const HowItWorks = () => {
  const steps = [
    {
      title: "Explore Packages",
      desc: "Browse decoration packages tailored for every occasion.",
    },
    {
      title: "Select Date & Time",
      desc: "Choose your preferred date, time, and service mode.",
    },
    {
      title: "Confirm & Pay",
      desc: "Securely confirm your booking with online payment.",
    },
    {
      title: "Decoration Day",
      desc: "Our professionals bring your vision to life.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#FCFAE0] via-[#F3E8FF] to-purple-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How StyleDecor Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-primary font-bold text-xl">0{i + 1}</span>
              <h3 className="text-lg font-semibold mt-3">{step.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================== STATS / TRUST ================== */
export const TrustStats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h3 className="text-4xl font-bold text-primary">500+</h3>
          <p className="text-gray-600">Successful Projects</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">50+</h3>
          <p className="text-gray-600">Expert Decorators</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">1K+</h3>
          <p className="text-gray-600">Happy Clients</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">24/7</h3>
          <p className="text-gray-600">Support Access</p>
        </div>
      </div>
    </section>
  );
};

/* ================== CTA SECTION ================== */
export const HomeCTA = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Plan Your Decoration?
        </h2>
        <p className="mb-8 text-white/90">
          Book your consultation or explore packages and let StyleDecor handle
          the rest.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/packages" className="btn bg-white text-primary">
            Explore Packages
          </Link>
          <Link
            to="/consultation"
            className="btn btn-outline text-white border-white"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ================== TESTIMONIAL PREVIEW ================== */
export const TestimonialsPreview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <BsStarFill key={idx} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4">
                "StyleDecor made our event truly special. Professional team and
                seamless booking experience."
              </p>
              <p className="font-semibold">— Happy Customer</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
