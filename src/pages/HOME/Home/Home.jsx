import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from "react-icons/fa";
import HeroBanner from "../Hero/HeroBanner";
import Features from "../Features/Features";
import HowItWorks from "../How It Works/HowItWorks";
import TrustStats from "../Trust Stats/TrustStats";
import HomeCTA from "../HomeCTA/HomeCTA";
import Testimonials from "../Testimonials/Testimonials";
import ServedBrands from "../Partners/Partners";
import PopularPacks from "../Popular Packages/PopularPacks";

const Home = () => {
  return (
    <div className="py-11">
      <title>Style Decor || Home</title>
      <HeroBanner />
      <HowItWorks />
      <PopularPacks />
      <Features />
      <ServedBrands />
      <TrustStats />
      <Testimonials />
      <HomeCTA />
    </div>
  );
};

export default Home;
