import { ArrowUpRight, Compass, Target } from "lucide-react";
import { Reveal, SectionHeading } from "../components/UI";
import { about } from "../data/content";

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <Reveal>
          <SectionHeading {...about} />
          <p className="about-detail">{about.detail}</p>
          <a href="#contact" className="text-link">
            Get to know your next technology partner <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <Reveal className="purpose-panel" delay={0.1}>
          <div className="purpose-top">
            <span className="mini-label">THE THINKING BEHIND THE BUILD</span>
            <span className="purpose-orbit" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="purpose-item">
            <div className="icon-box">
              <Target size={21} />
            </div>
            <div>
              <h3>Our mission</h3>
              <p>{about.mission}</p>
            </div>
          </div>
          <div className="purpose-item">
            <div className="icon-box">
              <Compass size={21} />
            </div>
            <div>
              <h3>Our vision</h3>
              <p>{about.vision}</p>
            </div>
          </div>
          <div className="purpose-bottom">
            <span className="tiny-dot" />
            Thoughtful technology. Meaningful impact.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
