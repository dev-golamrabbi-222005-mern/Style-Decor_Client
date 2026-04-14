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

  if (isLoading)
    return (
      <div className="text-center py-10 text-slate-500">Loading reviews...</div>
    );
  if (isError)
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load reviews.
      </div>
    );

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + reviewsData.length) % reviewsData.length,
    );
  };

  const currentReview = reviewsData[currentIndex];

  return (
    <section className="overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header - Scaled Down */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-[#577F84] font-bold">
            Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-2 italic">
            Client Stories
          </h2>
          <div className="w-16 h-1 bg-[#577F84] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Carousel Container - Height Optimized */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50/80">
            <div
              key={currentIndex}
              className="p-6 md:p-10 relative"
              style={{
                animation:
                  direction === 1
                    ? "slideInRight 0.4s ease-out"
                    : direction === -1
                      ? "slideInLeft 0.4s ease-out"
                      : "none",
              }}
            >
              {/* Subtle Quote - Smaller */}
              <Quote className="w-10 h-10 text-[#577F84] opacity-10 absolute top-6 left-6" />

              <div className="relative z-10">
                {/* Stars - Tightened */}
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < currentReview.ratings ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}`}
                    />
                  ))}
                </div>

                {/* Review Text - Reduced font size slightly for better fit */}
                <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6 text-center italic px-4">
                  "{currentReview.review}"
                </p>

                {/* Divider - Minimal */}
                <div className="w-12 h-px bg-slate-200 mx-auto mb-6" />

                {/* User Info - Row Layout to Save Height */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative">
                    <img
                      src={currentReview.user_photoURL}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      alt={currentReview.userName}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 text-sm">
                      {currentReview.userName}
                    </p>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">
                      {new Date(currentReview.date).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Buttons - Smaller & More Integrated */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white p-2.5 rounded-full shadow-md hover:text-[#577F84] transition-all"
            aria-label="Prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white p-2.5 rounded-full shadow-md hover:text-[#577F84] transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Compact Indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 rounded-full h-1.5 ${index === currentIndex ? "w-6 bg-[#577F84]" : "w-1.5 bg-slate-200"}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  );
};

export default Testimonials;
