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
  // 2. Define the responsive buttons once
  const ResponsiveButtons = (
    <div
      className="
        absolute z-50 flex items-center gap-3
        left-[5%] bottom-4
        md:bottom-12 md:left-[11%]
        lg:bottom-[10rem]
      "
    >
      <button className="btn btn-primary text-white">Explore Packages</button>

      <Link to="/consultation">
        <button className="btn bg-white text-gray-700">
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
        {/* 3. Map over the data array to render all slides */}
        {slideData.map((slide, index) => (
          <div key={index} className="relative p-5">
            <img
              src={slide.image}
              className="w-full h-56 md:h-96 lg:h-[32rem] object-cover rounded-xl"
              alt={slide.title}
            />

            <div className="absolute top-8 left-8 z-50 max-w-3xl text-left text-white lg:p-27 space-y-3">
              <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg drop-shadow-md">
                {slide.description}
              </p>
            </div>

            {ResponsiveButtons}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
