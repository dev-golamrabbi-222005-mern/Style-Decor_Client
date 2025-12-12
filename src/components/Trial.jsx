import React from "react";

// You would use an actual SVG or image here for production
const LogoIcon = () => (
  <span className="text-3xl text-teal-500 font-extrabold">🌿</span>
);

const Trial = () => {
  // Note: The background image needs to be set either by URL or an imported asset.
  // For this example, we'll use a placeholder class, but in a real project,
  // you'd use a dynamic style or the Tailwind 'bg-[url()]' utility.

  return (
    <div className="flex w-full max-w-7xl h-[300px] mx-auto rounded-lg overflow-hidden shadow-2xl bg-white">
      {/* --- Section 1: Image Background (Left Side) --- */}
      <div
        className="flex-3 bg-cover bg-center"
        style={{
          // Replace with your actual image URL/path
          backgroundImage: "url('https://example.com/your-decor-image.jpg')",
          flex: "2", // Custom flex basis to approximate the 70/30 split
        }}
      >
        {/* Optional: Overlay content like "Happy Anniversary" text if needed */}
      </div>

      {/* --- Section 2: Content Block (Right Side) --- */}
      <div className="flex-1 relative flex items-center pl-12">
        {/* Custom flex basis to approximate the 70/30 split */}

        {/* Diagonal Graphic Element (Tailwind & Custom CSS for the clip-path) */}
        <div
          className="absolute top-0 left-[-200px] w-full h-full bg-teal-500 z-0"
          style={{
            clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        ></div>

        <div className="relative z-10 p-5">
          {/* Logo Area */}
          <div className="flex items-center mb-4 text-gray-800">
            <LogoIcon />
            <span className="text-3xl font-bold tracking-tight">
              StyleDecor
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-base font-normal text-gray-700 leading-snug mb-6 max-w-xs">
            Transform Your Space. Effortless Event & Home Decor Booking
          </h1>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {/* Primary Button */}
            <button className="py-2 px-4 bg-teal-500 text-white rounded-full font-semibold border-2 border-teal-500 hover:bg-teal-600 transition duration-300 shadow-md text-sm">
              Explore Consultation
            </button>

            {/* Secondary Button (Outline) */}
            <button className="py-2 px-4 bg-transparent text-teal-500 rounded-full font-semibold border-2 border-teal-500 hover:bg-teal-50 transition duration-300 text-sm">
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trial;
