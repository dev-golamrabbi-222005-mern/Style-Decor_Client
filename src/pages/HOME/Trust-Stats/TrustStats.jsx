import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

const TrustStats = () => {
  // Create separate motion values for each stat
  const countSP = useMotionValue(0);
  const countED = useMotionValue(0);
  const countHC = useMotionValue(0);

  // Transform to rounded values
  const roundedSP = useTransform(countSP, (latest) => Math.round(latest));
  const roundedED = useTransform(countED, (latest) => Math.round(latest));
  const roundedHC = useTransform(countHC, (latest) => Math.round(latest));

  useEffect(() => {
    // Animate all counts
    const animationSP = animate(countSP, 555, { duration: 11 });
    const animationED = animate(countED, 75, { duration: 11 });
    const animationHC = animate(countHC, 12460, { duration: 11 });

    // Cleanup function
    return () => {
      animationSP.stop();
      animationED.stop();
      animationHC.stop();
    };
  }, [countSP, countED, countHC]);

  return (
    <section className="py-10 md:py-15 lg:py-22 bg-white rounded-2xl mb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h3 className="text-4xl font-bold text-primary">
            <motion.span>{roundedSP}</motion.span>+
          </h3>
          <p className="text-gray-600">Successful Projects</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">
            <motion.span>{roundedED}</motion.span>+
          </h3>
          <p className="text-gray-600">Expert Decorators</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">
            <motion.span>{roundedHC}</motion.span>+
          </h3>
          <p className="text-gray-600">Happy Clients</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">24/7</h3>
          <p className="text-gray-600">Support Access</p>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
