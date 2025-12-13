import React from 'react';

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
    <section className="py-20">
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

export default HowItWorks;