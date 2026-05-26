import React from "react";
import banner1 from "../../../assets/banner-2.png";
import banner2 from "../../../assets/banner-3.png";
import banner3 from "../../../assets/banner-4.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slideData = [
  {
    image: banner1,
    title: "Book Your Decoration Service Seamlessly",
    description:
      "Explore packages, check availability, choose a date & time, and confirm appointments—all within a smooth and modern online booking system.",
  },
  {
    image: banner2,
    title: "Transform Your Space with Elegant Decor",
    description:
      "Bring your dream decoration to life with premium home and event styling services. From subtle elegance to luxury—your vision becomes our creation.",
  },
  {
    image: banner3,
    title: "Make Every Occasion Unforgettable",
    description:
      "From weddings to corporate events, our decorators craft stunning experiences that leave lasting memories.",
  },
];

// 1. Move this component OUTSIDE HeroBanner so it executes cleanly
const ResponsiveButtons = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-row md:items-start items-center gap-3 md:gap-5 mt-4 md:mt-6"
    >
      <motion.div
        variants={buttonVariants}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          to="/services"
          className="btn btn-primary btn-sm md:btn-lg shadow-lg shadow-primary/20 tracking-wide transition-colors"
        >
          Explore Services
        </Link>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          to="/packages?service=On-Site%20Design%20Consultation"
          className="btn btn-sm md:btn-lg bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 tracking-wide shadow-lg shadow-black/5 transition-colors"
        >
          Book a Consultation
        </Link>
      </motion.div>
    </motion.div>
  );
};

const HeroBanner = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={true}
        interval={5000}
        className="hero-carousel"
      >
        {slideData.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-56 md:h-96 lg:h-[32rem]"
          >
            {/* 2. Added a dark vignette overlay to ensure text contrast over bright images */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />

            <img
              src={slide.image}
              className="w-full h-full object-cover"
              alt={slide.title}
            />

            {/* 3. Streamlined positioning context inside a single absolute grid */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl w-full mx-auto px-4 md:px-6 text-left text-white space-y-2 md:space-y-4">
                <h1 className="text-xl md:text-4xl lg:text-5xl font-semibold font-serif italic tracking-wider drop-shadow-lg max-w-xl md:max-w-2xl lg:max-w-3xl leading-snug">
                  {slide.title}
                </h1>
                <p className="text-xs md:text-base lg:text-lg max-w-sm md:max-w-xl text-gray-200 drop-shadow-md font-light leading-relaxed">
                  {slide.description}
                </p>

                {/* 4. Rendered correctly as an active React Component */}
                <ResponsiveButtons />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
