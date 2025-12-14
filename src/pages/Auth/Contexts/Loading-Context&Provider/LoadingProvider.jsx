import { useState } from "react";
import LoadingContext from "./LoadingContext";

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}

      {/* Global Loading Spinner Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            <p className="text-white mt-4 font-semibold text-lg">Loading...</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
