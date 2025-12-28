import Navbar from "../component/home/Navbar";
import HeroSection from "../component/home/HeroSection";
import Features from "../component/home/Features";
import TrustedBy from "../component/home/TrustedBy";
import CourseSlider from "../component/home/CourseSlider";
import InvestCareer from "../component/home/career";
import HowItWorks from "../component/home/working";
import Categories from "../component/home/Categories";
import Testimonials from "../component/home/Reviews.jsx";
import BecomeInstructor from "../component/home/BecomeInstructor.jsx";
import Footer from "../component/home/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <TrustedBy />
      <CourseSlider />
      <InvestCareer />
      <HowItWorks />
      <Categories />
      <Testimonials />
      <BecomeInstructor />
      <Footer />
    </>
  );
}