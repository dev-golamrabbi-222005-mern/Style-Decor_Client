import { Link } from "react-router-dom";
import CTA_bg from "../../../assets/banner-1.png";

const HomeCTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <div
        className="relative overflow-hidden rounded-[3rem] shadow-2xl"
        style={{
          backgroundImage: `url(${CTA_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 py-8 md:py-12 text-center text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-bold mb-4 block">
            Start Your Journey
          </span>

          <h2 className="text-3xl md:text-5xl font-serif italic mb-6 leading-tight">
            Ready to Plan Your <br className="hidden md:block" /> Perfect
            Decoration?
          </h2>

          <p className="mb-10 text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, let StyleDecor bring
            your vision to life with expert precision and elegance.
          </p>

          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Link
              to="/services"
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-[#577F84] hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-white/10 uppercase tracking-widest text-xs"
            >
              Explore Packages
            </Link>

            <Link
              to="/packages?service=On-Site%20Design%20Consultation"
              className="px-8 py-4 border border-white/40 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 uppercase tracking-widest text-xs"
            >
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#577F84]/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HomeCTA;
