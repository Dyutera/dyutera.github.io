import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, Button } from "./UI";
import { navigation } from "../data/content";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    navigation.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 1000) setOpen(false);
    };
    if (open) document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Logo />
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "nav-links is-open" : "nav-links"}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button
            href="#contact"
            className="mobile-cta"
            onClick={() => setOpen(false)}
          >
            Start a project
          </Button>
        </nav>
        <Button href="#contact" className="nav-cta" diagonal>
          Start a project
        </Button>
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
