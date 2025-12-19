import PageWrapper from "./PageWrapper";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <PageWrapper title="About Us">
        <p>
          Get-Skillz is a modern learning management platform designed to help
          students gain real-world skills through expert-led courses.
        </p>
        <p>
          Our mission is to make quality education affordable, accessible, and
          practical for everyone.
        </p>
      </PageWrapper>
      <Footer />
    </>
  );
}
