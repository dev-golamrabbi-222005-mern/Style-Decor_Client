import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const services = [
  {
    title: "Home Decoration",
    desc: "Elegant and modern decoration solutions to transform your home for any occasion.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Wedding Decoration",
    desc: "Luxurious wedding stage, floral, and venue decoration to make your big day unforgettable.",
    image: "https://i.ibb.co.com/jvDsYLfD/b4f6590f3f0f80749c2fd601a2be5bf0.jpg",
  },
  {
    title: "Birthday & Party Decor",
    desc: "Creative and colorful decoration themes for birthdays, anniversaries, and private parties.",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
  },
  {
    title: "Corporate & Event Styling",
    desc: "Professional event styling for corporate programs, launches, and formal events.",
    image:
      "https://i.ibb.co.com/hRsrqwLr/living-room-decor-ideas-5442837-hero-8b6e540e13f9457a84fe9f9e26ea2e5c.jpg",
  },
  {
    title: "Floral & Lighting Setup",
    desc: "Premium floral arrangements and ambient lighting to elevate the overall experience.",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321",
  },
  {
    title: "Consultation Services",
    desc: "In-studio and on-site consultation to plan and customize your decoration perfectly.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

const Services = () => {
  return (
    <div className="bg-gradient-to-br from-[#FCFAE0] via-[#F3E8FF] to-purple-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Decoration Services
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
                alt={service.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>

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
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Decorate Your Special Moment?
          </h2>
          <p className="text-gray-600 mb-8">
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