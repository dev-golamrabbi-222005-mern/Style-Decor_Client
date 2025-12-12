import banner1 from "../../../../assets/banner-2.png";
import banner2 from "../../../../assets/banner-3.png";
import banner3 from "../../../../assets/banner-4.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroBanner = () => {
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
        <button className="btn bg-white text-gray-700">Book a Consultation</button>
      </Link>
    </div>
  );

  return (
    <div className="my-10">
      <Carousel
        showThumbs={false}
        // autoPlay={true}
        // infiniteLoop={true}
        showStatus={false}
      >
        {/* SLIDE 1 */}
        <div className="relative p-5">
          <img
            src={banner1}
            className="w-full h-56 md:h-96 lg:h-[32rem] object-cover rounded-xl"
          />

          <div className="absolute top-8 left-8 z-50 max-w-3xl text-left  text-white lg:p-27 space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
              Book Your Decoration Service Seamlessly
            </h1>
            <p className="text-sm md:text-lg drop-shadow-md">
              Explore packages, check availability, choose a date & time, and
              confirm appointments—all within a smooth and modern online booking
              system.
            </p>
          </div>

          {ResponsiveButtons}
        </div>

        {/* SLIDE 2 */}
        <div className="relative p-5">
          <img
            src={banner2}
            className="w-full h-56 md:h-96 lg:h-[32rem] object-cover rounded-xl"
          />

          <div className="absolute top-8 left-8 z-50 text-left max-w-3xl lg:p-27 text-white space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
              Transform Your Space with Elegant Decor
            </h1>
            <p className="text-sm md:text-lg drop-shadow-md">
              Bring your dream decoration to life with premium home and event
              styling services. From subtle elegance to luxury—your vision
              becomes our creation.
            </p>
          </div>

          {ResponsiveButtons}
        </div>

        {/* SLIDE 3 */}
        <div className="relative p-5">
          <img
            src={banner3}
            className="w-full h-56 md:h-96 lg:h-[32rem] object-cover rounded-xl"
          />

          <div className="absolute top-8 left-8 z-50 lg:p-27 text-left max-w-3xl text-white space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
              Make Every Occasion Unforgettable
            </h1>
            <p className="text-sm md:text-lg drop-shadow-md">
              From weddings to corporate events, our decorators craft stunning
              experiences that leave lasting memories.
            </p>
          </div>

          {ResponsiveButtons}
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
