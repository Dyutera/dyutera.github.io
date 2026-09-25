import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { site } from "../config/site";

export function SocialLinks() {
  return (
    <div className="social-links">
      {site.github && (
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="DYUTERA on GitHub (opens in a new tab)"
        >
          <Github size={19} />
        </a>
      )}
      {site.linkedin && (
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="DYUTERA on LinkedIn (opens in a new tab)"
        >
          <Linkedin size={19} />
        </a>
      )}
    </div>
  );
}
export default function ContactLinks() {
  return (
    <div className="contact-links">
      {site.email && (
        <a href={`mailto:${site.email}`}>
          <Mail size={18} />
          {site.email}
        </a>
      )}
      {site.phone && (
        <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>
          <Phone size={18} />
          {site.phone}
        </a>
      )}
      {site.whatsapp && (
        <a
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {site.location && (
        <p>
          <MapPin size={18} />
          {site.location}
        </p>
      )}
      <SocialLinks />
    </div>
  );
}
