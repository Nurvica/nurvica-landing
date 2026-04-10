import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import FounderSection from "./components/FounderSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <FounderSection />
      <CTASection />
      <Footer />
    </main>
  );
}
