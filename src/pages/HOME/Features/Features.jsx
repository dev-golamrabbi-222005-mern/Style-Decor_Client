import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const Features = () => {
  // Upgraded data structure to include descriptions for a more "pro" look
  const features = [
    {
      title: "Easy Online Booking",
      desc: "Reserve your date in under 60 seconds.",
    },
    {
      title: "Professional Decorators",
      desc: "Expert stylists with years of interior experience.",
    },
    {
      title: "On-site & In-studio",
      desc: "Flexible services tailored to your specific space.",
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden fees. What you see is what you pay.",
    },
    {
      title: "Real-time Tracking",
      desc: "Stay updated on your project's progress live.",
    },
    {
      title: "Secure Payments",
      desc: "Fully encrypted transactions for your peace of mind.",
    },
  ];

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6">
        {/* Consistent Header Style */}
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-[0.3em] text-[#577F84] font-bold">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-4 italic">
            Why StyleDecor
          </h2>
          <div className="w-24 h-1 bg-[#577F84] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-[#577F84]/5 transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#577F84]/10 text-[#577F84] mb-6 group-hover:bg-[#577F84] group-hover:text-white transition-colors duration-300">
                <BsCheckCircleFill className="text-xl" />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
