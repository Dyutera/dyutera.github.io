import { ArrowUpRight } from "lucide-react";
import { Logo } from "./UI";
import { SocialLinks } from "./ContactLinks";
import { site } from "../config/site";
import { navigation } from "../data/content";
import { services } from "../data/services";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{site.footerDescription}</p>
            <SocialLinks />
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              {navigation.slice(1).map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>What we do</h3>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-invitation">
            <span className="mini-label">HAVE SOMETHING IN MIND?</span>
            <a href="#contact">
              Let’s make
              <br />
              it happen.
              <ArrowUpRight size={28} />
            </a>
            <span className="footer-tagline">{site.tagline}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Ideas into impact. Built with purpose.</span>
          <a href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
