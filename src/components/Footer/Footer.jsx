import React from "react";
import footerLine from "../../assets/footer-Line-1.png";
import newsletterImg from "../../assets/newsletter.png";
import { Newspaper, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundImage: `url(${footerLine})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
        backgroundSize: "contain",
      }}
      className="bg-[#FCFAE0] text-slate-800 pt-16"
    >
      {/* Newsletter Section - Only on Home */}
      {location.pathname === "/" && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
            {/* Decorative Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#577F84]/5 rounded-bl-full"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <img className="w-20 mb-6" src={newsletterImg} alt="Newsletter" />
              <span className="text-[#577F84] font-bold text-xs uppercase tracking-[0.3em] mb-2">
                Exclusive Updates
              </span>
              <h2 className="text-3xl md:text-4xl font-serif italic mb-4">
                Subscribe for Coupons
              </h2>
              <p className="max-w-xl text-slate-500 mb-8 leading-relaxed">
                Join our community to get updates on new decoration packages,
                seasonal offers, and exclusive discounts delivered to your
                inbox.
              </p>

              <form className="flex flex-col sm:flex-row w-full max-w-lg gap-3">
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-[#577F84] transition-all"
                    type="email"
                    placeholder="yourname@email.com"
                    name="email"
                    required
                  />
                </div>
                <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-[#577F84] transition-all duration-300 shadow-lg shadow-slate-200">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="w-full h-px bg-slate-200 mt-16"></div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <Logo />
          <p className="text-slate-500 text-sm leading-relaxed">
            A premier appointment management system for StyleDecor, transforming
            spaces through expert in-studio and on-site decoration services
            across Bangladesh.
          </p>
          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-slate-100 w-fit">
            <Clock className="w-5 h-5 text-[#577F84]" />
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-600">
              9AM - 9PM <span className="text-slate-300 mx-1">|</span> Sat - Thu
            </div>
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h6 className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-[#577F84] pl-3">
            Services
          </h6>
          <ul className="space-y-3 text-sm text-slate-500">
            {[
              "Home Decoration",
              "Event Styling",
              "Wedding Stage",
              "Floral Setup",
              "On-Site Design",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="/services"
                  className="hover:text-[#577F84] hover:pl-2 transition-all duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h6 className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-[#577F84] pl-3">
            Contact
          </h6>
          <ul className="space-y-4 text-sm text-slate-500">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-[#577F84] shrink-0" />
              <span>Uttara, Sector 4, Dhaka 1230</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-[#577F84] shrink-0" />
              <a href="tel:+8801700000000" className="hover:text-[#577F84]">
                +880 1700-000000
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-[#577F84] shrink-0" />
              <a
                href="mailto:support@styledecor.com"
                className="hover:text-[#577F84]"
              >
                support@styledecor.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Legal Column */}
        <div>
          <h6 className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-[#577F84] pl-3">
            Connect
          </h6>
          <div className="flex gap-4 mb-8">
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-sm hover:bg-[#577F84] hover:text-white transition-all"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-sm hover:bg-[#577F84] hover:text-white transition-all"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-sm hover:bg-[#577F84] hover:text-white transition-all"
            >
              <FaXTwitter size={18} />
            </a>
          </div>
          <div className="space-y-2 text-xs font-medium text-slate-400">
            <Link to="/privacy" className="block hover:text-slate-600">
              Privacy Policy
            </Link>
            <Link to="/terms" className="block hover:text-slate-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-200/60 py-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Status: Fully Operational</span>
          </div>
          <p className="tracking-wide uppercase font-bold text-[10px]">
            © {currentYear}{" "}
            <span className="text-slate-900 ml-1">Md. Golam Rabbi</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
