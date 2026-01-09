import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const {
    data: reviewsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/usersReviews");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading reviews...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        Failed to load reviews. Please try again later.
      </div>
    );
  }

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + reviewsData.length) % reviewsData.length
    );
  };

  const currentReview = reviewsData[currentIndex];

  return (
    <section>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
              Testimonials
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            What Our Clients Say
            <div className="border-b-5 border-[#577F84] max-w-55 mx-auto mt-5"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it – hear from our satisfied clients
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative shadow-2xl">
          {/* Review Card */}
          <div className="overflow-hidden">
            <div
              key={currentIndex}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative"
              style={{
                animation:
                  direction === 1
                    ? "slideInRight 0.5s ease-out"
                    : direction === -1
                    ? "slideInLeft 0.5s ease-out"
                    : "none",
              }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-100 to-pink-100 rounded-tr-full opacity-30" />

              {/* Quote Icon */}
              <div className="relative">
                <Quote className="w-15 h-15 text-blue-500 opacity-22" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 relative justify-center">
                {[...Array(5)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`w-6 h-6 transition-all duration-200 ${
                      starIndex < currentReview.ratings
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 relative text-center italic">
                "{currentReview.review}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

              {/* User Info */}
              <div
                className="flex flex-col items-center gap-4 relative tooltip"
                data-tip={currentReview.user_email} // show email as tooltip
              >
                <div className="relative">
                  <img
                    src={currentReview.user_photoURL}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100 shadow-lg"
                    alt={currentReview.userName}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
                </div>

                <div className="text-center">
                  <p className="font-bold text-gray-900 text-xl mb-1">
                    {currentReview.userName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(currentReview.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-5 bg-white hover:bg-blue-50 text-gray-800 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-5 bg-white hover:bg-blue-50 text-gray-800 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-12 h-3 bg-blue-600"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            {currentIndex + 1} / {reviewsData.length}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
