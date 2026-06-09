import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import FeaturesGrid from "./components/FeaturesGrid";
import MoodTracker from "./components/MoodTracker";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import JournalPreview from "./components/JournalPreview";
import StatsBanner from "./components/StatsBanner";
import PricingCards from "./components/PricingCards";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base selection:bg-brand-green selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <FeaturesGrid />
        <MoodTracker />
        <TestimonialsCarousel />
        <JournalPreview />
        <StatsBanner />
        <PricingCards />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
