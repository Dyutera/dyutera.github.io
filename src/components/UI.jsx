import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Blocks,
  Braces,
  Code2,
  Database,
  Heart,
  Handshake,
  Layers3,
  Map,
  MessageCircle,
  PenTool,
  Rocket,
  Search,
  Smartphone,
  Sparkles,
  Target,
} from "lucide-react";

const icons = {
  code: Code2,
  layers: Layers3,
  phone: Smartphone,
  sparkles: Sparkles,
  database: Database,
  pen: PenTool,
  target: Target,
  braces: Braces,
  heart: Heart,
  message: MessageCircle,
  blocks: Blocks,
  handshake: Handshake,
  search: Search,
  map: Map,
  rocket: Rocket,
};
export function Icon({ name, ...props }) {
  const Component = icons[name] || Code2;
  return <Component aria-hidden="true" {...props} />;
}
export function Logo() {
  return (
    <a className="logo" href="#home" aria-label="DYUTERA home">
      <svg width="32" height="35" viewBox="0 0 40 44" aria-hidden="true">
        <path d="M12 4h11l15 18-15 18H12l15-18Z" fill="currentColor" />
        <path
          d="m3 14 7 8-7 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        DYUTERA<span className="logo-dot">.</span>
      </span>
    </a>
  );
}
export function Button({
  children,
  href,
  secondary = false,
  diagonal = false,
  className = "",
  ...props
}) {
  const Component = href ? "a" : "button";
  const Arrow = diagonal ? ArrowUpRight : ArrowRight;
  return (
    <Component
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
      {...props}
    >
      {children}
      <Arrow size={17} aria-hidden="true" />
    </Component>
  );
}
export function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="eyebrow">
        <span />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function Tags({ items }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
