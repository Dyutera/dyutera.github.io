import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Tags } from "./UI";
import { ProjectLinks } from "./ProjectCard";

export default function ProjectModal({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const priorFocus = document.activeElement;
    const priorOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = priorOverflow;
      priorFocus?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = [
          ...ref.current.querySelectorAll(
            'button, a[href], input, select, textarea, [tabindex="0"]',
          ),
        ];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span className="eyebrow">{project.status || project.type}</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close project details"
            autoFocus
          >
            <X size={22} />
          </button>
        </div>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="dialog-subtitle">{project.subtitle}</p>
        <Tags items={project.technologies} />
        <div className="dialog-screenshots">
          {project.screenshots.map((src, index) => (
            <img
              src={src}
              key={src}
              alt={`${project.title} ${project.status ? "illustrative preview" : "screenshot"} ${index + 1}`}
              width="720"
              height="480"
              loading="lazy"
            />
          ))}
        </div>
        <div className="dialog-copy">
          <h3>Project overview</h3>
          <p>{project.description}</p>
          <h3>The challenge</h3>
          <p>{project.problem}</p>
          <h3>The solution</h3>
          <p>{project.solution}</p>
          <h3>Main features</h3>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <h3>Technologies {project.status ? "envisioned" : "used"}</h3>
          <Tags items={project.technologies} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </dialog>
  );
}
