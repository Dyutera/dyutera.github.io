import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { Reveal, SectionHeading } from "../components/UI";
import ContactLinks from "../components/ContactLinks";
import { site } from "../config/site";
import { services } from "../data/services";
import { copy } from "../data/content";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const configured = Boolean(site.formEndpoint || site.email);
  async function submit(event) {
    event.preventDefault();
    if (!configured || status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    if (!site.formEndpoint) {
      const subject = `Project inquiry: ${data.get("projectType")}`;
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject type: ${data.get("projectType")}\n\n${data.get("description")}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("draft");
      setMessage(
        "Your email draft is ready in your email app. Please send it there to complete your inquiry. If no app opened, use the email link beside this form.",
      );
      return;
    }
    setStatus("sending");
    setMessage("Sending your inquiry…");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      setMessage(
        "Thank you. Your inquiry has been sent. We look forward to learning more about your idea.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "We couldn’t confirm delivery. Please try again in a moment, or use another available contact method. Your message is still here.",
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <Reveal className="contact-intro">
          <SectionHeading {...copy.contact} />
          <ContactLinks />
          <div className="contact-note">
            <Sparkles size={20} />
            <span>{copy.contact.note}</span>
          </div>
          <div className="contact-decoration" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="deco-center">↗</span>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.08}>
          <form onSubmit={submit} className="contact-form">
            <h3>Tell us about your project</h3>
            <p>A few details today. New possibilities tomorrow.</p>
            <div className="form-row">
              <label>
                Full name<span aria-hidden="true"> *</span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Email address<span aria-hidden="true"> *</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <label>
              Project type<span aria-hidden="true"> *</span>
              <select name="projectType" required defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service.id}>{service.title}</option>
                ))}
                <option>Something else / Let’s explore</option>
              </select>
            </label>
            <label>
              Project description<span aria-hidden="true"> *</span>
              <textarea
                name="description"
                rows={5}
                placeholder="Tell us about your idea, goals, or the challenge you’d like to solve…"
                required
                minLength={20}
                maxLength={5000}
              />
            </label>
            <div className="honeypot" aria-hidden="true">
              <label>
                Leave this blank
                <input name="_gotcha" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <button
              className="button button-primary submit-button"
              type="submit"
              disabled={!configured || status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle className="loading" size={17} />
                  Sending inquiry…
                </>
              ) : (
                <>
                  Send inquiry <ArrowUpRight size={18} />
                </>
              )}
            </button>
            {!configured ? (
              <p className="form-note" role="status">
                Project inquiries will open soon. Contact details are being
                finalized.
              </p>
            ) : (
              <p className="form-note">
                {site.formEndpoint
                  ? "Your details are shared with our form provider to deliver your inquiry."
                  : "This opens your email app with a draft. Review and send it there."}
              </p>
            )}
            <div
              className={`form-status status-${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "success" && <CheckCircle2 size={20} />}
              <span>{message}</span>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
