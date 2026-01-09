import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from "react-icons/fa";
import HeroBanner from "../Hero/HeroBanner";
import Features from "../Features/Features";
import HowItWorks from "../How-It-Works/HowItWorks";
import TrustStats from "../Trust-Stats/TrustStats";
import HomeCTA from "../Home-CTA/HomeCTA";
import Testimonials from "../Testimonials/Testimonials";
import ServedBrands from "../Partners/Partners";
import PopularPacks from "../Popular-Packages/PopularPacks";
import Coverage from "../Coverage/Coverage";
import TopDecorators from "../Top-Decorators/TopDecorators";
import SectionDivider from "../../../components/Divider/SectionDivider";

const Home = () => {
  return (
    <div className="pb-3 md:pb-7 lg:pb-11">
      <title>Style Decor || Home</title>
      <HeroBanner />
      <SectionDivider />
      <div className="max-w-7xl mx-auto">
        <HowItWorks />
        <SectionDivider />
        <PopularPacks />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <TopDecorators />
        <SectionDivider />
        <ServedBrands />
        <SectionDivider />
        <TrustStats />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Coverage />
        <SectionDivider />
        <HomeCTA />
      </div>
    </div>
  );
};

export default Home;
