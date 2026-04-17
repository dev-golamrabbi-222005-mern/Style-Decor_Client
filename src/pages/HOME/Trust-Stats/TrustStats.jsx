import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

const TrustStats = () => {
  const countSP = useMotionValue(0);
  const countED = useMotionValue(0);
  const countHC = useMotionValue(0);

  const roundedSP = useTransform(countSP, (latest) => Math.round(latest));
  const roundedED = useTransform(countED, (latest) => Math.round(latest));
  const roundedHC = useTransform(countHC, (latest) => Math.round(latest));

  useEffect(() => {
    // Snappier duration (3-4 seconds) feels more professional
    const animationSP = animate(countSP, 555, { duration: 4, ease: "easeOut" });
    const animationED = animate(countED, 75, { duration: 4, ease: "easeOut" });
    const animationHC = animate(countHC, 12460, {
      duration: 4,
      ease: "easeOut",
    });

    return () => {
      animationSP.stop();
      animationED.stop();
      animationHC.stop();
    };
  }, [countSP, countED, countHC]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[3rem] p-10 md:p-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 text-center">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-4xl md:text-5xl font-serif font-semibold italic text-[#577F84] mb-2">
              <motion.span>{roundedSP}</motion.span>+
            </h3>
            <p className="text-slate-500 text-xs md:text-sm uppercase tracking-widest font-bold">
              Successful Projects
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-4xl md:text-5xl font-serif font-semibold italic text-[#577F84] mb-2">
              <motion.span>{roundedED}</motion.span>+
            </h3>
            <p className="text-slate-500 text-xs md:text-sm uppercase tracking-widest font-bold">
              Expert Decorators
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-4xl md:text-5xl font-serif font-semibold italic text-[#577F84] mb-2">
              <motion.span>{roundedHC}</motion.span>+
            </h3>
            <p className="text-slate-500 text-xs md:text-sm uppercase tracking-widest font-bold">
              Happy Clients
            </p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-4xl md:text-5xl font-serif font-semibold italic text-[#577F84] mb-2 tracking-tighter">
              24/7
            </h3>
            <p className="text-slate-500 text-xs md:text-sm uppercase tracking-widest font-bold">
              Support Access
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
