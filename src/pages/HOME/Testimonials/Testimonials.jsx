import { BsStarFill } from "react-icons/bs";

const Testimonials = () => {

  return (
    <section className="py-10 md:py-15 lg:py-22">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12">
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

export default Testimonials;