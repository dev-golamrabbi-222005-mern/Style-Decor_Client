import { Link } from "react-router-dom";
import CTA_bg from '../../../assets/banner-1.png'

const HomeCTA = () => {

  return (
    <section
      style={{
        backgroundImage: `url(${CTA_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-10 md:py-15 lg:py-22 rounded-2xl bg-primary text-white"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
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

export default HomeCTA;