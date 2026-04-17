import banner1 from "../../../assets/banner-2.png";
import banner2 from "../../../assets/banner-3.png";
import banner3 from "../../../assets/banner-4.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// 1. Define the slide content in a single data structure
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

const HeroBanner = () => {

  const ResponsiveButtons = (
    <div
      className="
        absolute z-50 flex md:items-center flex-col md:flex-row items-start gap-3 md:gap-5
        left-[8%] bottom-10
        md:bottom-15 md:left-[4%]
        lg:bottom-33 lg:left-[9.3%]
      "
    >
      <Link to="/services" className="btn btn-primary btn-sm md:btn-lg">
        Explore Services
      </Link>
      <Link to="/packages?service=On-Site%20Design%20Consultation">
        <button className="btn bg-white text-gray-700 btn-sm md:btn-lg">
          Book a Consultation
        </button>
      </Link>
    </div>
  );

  return (
    <div>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
      >
        {slideData.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              className="w-full h-56 md:h-96 lg:h-[32rem] object-cover"
              alt={slide.title}
            />
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="absolute top-8 md:top-22 lg:top-11 left-8 z-50 text-left text-white pr-8 lg:p-27 space-y-3">
                <h1 className="text-2xl md:text-4xl font-semibold font-serif italic tracking-wider drop-shadow-lg md:max-w-2xl lg:max-w-5xl">
                  {slide.title}
                </h1>
                <p className="text-sm md:max-w-lg lg:max-w-xl hidden md:block md:text-lg drop-shadow-md">
                  {slide.description}
                </p>
              </div>
            </div>

            {ResponsiveButtons}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
