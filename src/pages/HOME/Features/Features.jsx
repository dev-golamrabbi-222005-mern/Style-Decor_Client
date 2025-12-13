import { Link } from "react-router-dom";
import { BsCheckCircleFill, BsStarFill } from "react-icons/bs";

const Features = () => {
  const features = [
    "Easy Online Booking",
    "Professional Decorators",
    "On-site & In-studio Services",
    "Transparent Pricing",
    "Real-time Service Tracking",
    "Secure Online Payments",
  ];

  return (
    <section className="py-10 md:py-15 lg:py-22 rounded-2xl bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12">
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

export default Features;
