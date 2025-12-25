import Navbar from "../component/Navbar";
import HeroSection from "../component/HeroSection";
import Features from "../component/Features";
import TrustedBy from "../component/TrustedBy";
import CourseSlider from "../component/CourseSlider";
import InvestCareer from "../component/career";
import Footer from "../component/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <TrustedBy />
      <CourseSlider />
      <InvestCareer />
      <Footer />
    </>
  );
}