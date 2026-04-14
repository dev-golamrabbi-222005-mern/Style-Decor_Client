import React from "react";
import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";

const brandLogos = [amazon, casio, moonstar, randstad, star, startPeople];

const ServedBrands = () => {
  return (
    <section className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Consistent Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-[#577F84] font-bold">
            Collaborations
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-4 italic">
            Our Trusted Partners
          </h2>
          <div className="w-24 h-1 bg-[#577F84] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Marquee with Gradient Masking */}
        <div className="relative w-full">
          {/* Left & Right Fade Masks */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <Marquee
            pauseOnHover={true}
            speed={60} // Slower for a more premium, relaxed feel
            gradient={false}
            className="py-4"
          >
            {brandLogos.map((logo, index) => (
              <div
                key={index}
                className="mx-8 lg:mx-16 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Partner Brand"
                  className="h-10 md:h-12 w-auto object-contain cursor-pointer"
                />
              </div>
            ))}
            {/* Duplicate set for a seamless infinite loop if logos are few */}
            {brandLogos.map((logo, index) => (
              <div
                key={`dup-${index}`}
                className="mx-8 lg:mx-16 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Partner Brand"
                  className="h-10 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default ServedBrands;
