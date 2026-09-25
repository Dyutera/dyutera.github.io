import { ArrowDown, Check } from "lucide-react";
import { Button, Reveal } from "../components/UI";
import ArchitectureVisual from "../components/ArchitectureVisual";
import { hero } from "../data/content";
import { featuredTechnologies } from "../data/technologies";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <Reveal className="hero-content">
          <div className="hero-eyebrow">
            <span className="live-dot" />
            {hero.eyebrow}
          </div>
          <h1>
            {hero.headline[0]}
            <br />
            <span>{hero.headline[1]}</span>
          </h1>
          <p className="hero-description">{hero.description}</p>
          <div className="hero-buttons">
            <Button href="#projects">{hero.primary}</Button>
            <Button href="#contact" secondary diagonal>
              {hero.secondary}
            </Button>
          </div>
          <div className="hero-commitments">
            {hero.commitments.map((text) => (
              <span key={text}>
                <Check size={13} />
                {text}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal className="hero-art" delay={0.12}>
          <ArchitectureVisual />
        </Reveal>
      </div>
      <div className="container hero-bottom">
        <a href="#services" className="scroll-prompt">
          <span className="scroll-icon">
            <ArrowDown size={14} />
          </span>
          SCROLL TO EXPLORE
        </a>
        <span className="hero-caption">FROM FIRST IDEA TO WHAT’S NEXT.</span>
      </div>
      <div className="tech-strip">
        <div className="container tech-strip-inner">
          <span className="tech-strip-label">BUILT WITH THE RIGHT TOOLS</span>
          <div className="tech-strip-logos">
            {featuredTechnologies.map((name, i) => (
              <span key={name}>
                <span
                  className={`tech-symbol tech-symbol-${i}`}
                  aria-hidden="true"
                >
                  {["⚛", "⬡", "♨", "⌘", "aws", "⚛"][i]}
                </span>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
