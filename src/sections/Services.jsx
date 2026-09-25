import { ArrowUpRight } from "lucide-react";
import { Icon, Reveal, SectionHeading } from "../components/UI";
import { services } from "../data/services";
import { copy } from "../data/content";

export function ServiceCard({ service, index }) {
  return (
    <Reveal delay={(index % 3) * 0.05}>
      <a className="service-card" href={`#contact`}>
        <div className="service-card-top">
          <span className="icon-box">
            <Icon name={service.icon} size={23} />
          </span>
          <ArrowUpRight className="service-arrow" size={19} />
        </div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="service-tags">{service.tags}</div>
      </a>
    </Reveal>
  );
}
export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <Reveal>
          <SectionHeading {...copy.services} centered />
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
