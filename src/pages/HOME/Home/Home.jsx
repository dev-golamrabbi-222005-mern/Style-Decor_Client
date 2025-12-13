import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from "react-icons/fa";
import HeroBanner from "../Hero/HeroBanner";
import Features from "../Features/Features";
import HowItWorks from "../How It Works/HowItWorks";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <HowItWorks/>
      <Features/>

    </div>
  );
};

export default Home;
