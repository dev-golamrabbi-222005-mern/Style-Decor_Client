import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Explore Packages",
      desc: "Browse decoration packages tailored for every occasion.",
      icon: "01",
    },
    {
      title: "Select Date & Time",
      desc: "Choose your preferred date, time, and service mode.",
      icon: "02",
    },
    {
      title: "Confirm & Pay",
      desc: "Securely confirm your booking with online payment.",
      icon: "03",
    },
    {
      title: "Decoration Day",
      desc: "Our professionals bring your vision to life.",
      icon: "04",
    },
  ];

  return (
    <section className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* Decorative Background Element */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden lg:block -z-0"></div>

        <div className="text-center mb-10 relative z-10">
          <span className="text-sm uppercase tracking-[0.3em] text-[#577F84] font-bold">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-4 italic">
            How StyleDecor Works
          </h2>
          <div className="w-24 h-1 bg-[#577F84] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center transition-all duration-500"
            >
              {/* Number Circle */}
              <div className="w-16 h-16 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-8 group-hover:bg-[#577F84] group-hover:text-white transition-colors duration-300 relative z-10">
                <span className="font-serif text-2xl italic tracking-tighter">
                  {step.icon}
                </span>
              </div>

              {/* Content Card */}
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 group-hover:text-[#577F84] transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>

              {/* Connecting Dot (Mobile/Tablet Hidden) */}
              <div className="hidden lg:block absolute top-8 -right-6 w-2 h-2 rounded-full bg-slate-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
