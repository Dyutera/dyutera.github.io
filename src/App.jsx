import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import { WhyUs, Process, TechnologyStack } from "./sections/Approach";
import Contact from "./sections/Contact";

export default function App() {
  useEffect(() => {
    // On a direct fragment URL, React mounts after the browser's first anchor lookup.
    const hash = window.location.hash;
    if (!hash) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || window.location.hash !== hash) return;
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <Process />
        <TechnologyStack />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
