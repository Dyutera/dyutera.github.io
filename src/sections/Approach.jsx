import { Icon, Reveal, SectionHeading } from "../components/UI";
import { approaches, process, copy } from "../data/content";
import { technologies } from "../data/technologies";

export function WhyUs() {
  return (
    <section id="why-us" className="section why-section">
      <div className="container why-grid">
        <Reveal className="why-intro">
          <SectionHeading {...copy.why} />
          <div className="why-signature">
            <span className="signature-symbol" aria-hidden="true">
              ↗
            </span>
            <span>
              Built together.
              <br />
              <strong>Built to matter.</strong>
            </span>
          </div>
        </Reveal>
        <div className="approach-grid">
          {approaches.map((item, index) => (
            <Reveal key={item.title} delay={(index % 2) * 0.07}>
              <div className="approach-item">
                <Icon name={item.icon} size={23} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="container">
        <Reveal>
          <SectionHeading {...copy.process} centered />
        </Reveal>
        <ol className="process-grid">
          {process.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.05}>
                <div className="process-number">
                  <span>0{index + 1}</span>
                  <Icon name={step.icon} size={19} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function TechnologyStack() {
  return (
    <section id="technologies" className="section technologies-section">
      <div className="container">
        <Reveal>
          <SectionHeading {...copy.tech} centered />
        </Reveal>
        <div className="technology-grid">
          {technologies.map((group) => (
            <Reveal key={group.category}>
              <div className="technology-group">
                <h3>{group.category}</h3>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
