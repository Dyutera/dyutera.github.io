import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Tags } from "./UI";

export function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={15} /> Live demo
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <Github size={15} /> GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
export function ProjectImage({ project, ...props }) {
  return project.image ? (
    <img
      src={project.image}
      alt={`${project.title} — ${project.type} ${project.status ? "concept preview" : "screenshot"}`}
      loading="lazy"
      width="720"
      height="480"
      {...props}
      onError={(event) => {
        event.currentTarget.style.display = "none";
        event.currentTarget.parentElement.classList.add("image-unavailable");
      }}
    />
  ) : (
    <div className="project-no-image">
      <span>{project.title.slice(0, 1)}</span>
      <p>{project.type}</p>
    </div>
  );
}
export default function ProjectCard({ project, onSelect }) {
  return (
    <article className={`project-card project-${project.preview || "default"}`}>
      <button
        className="project-image"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.title} details`}
      >
        <ProjectImage project={project} />
        <span className="preview-label">
          {project.status ||
            (project.category === "client-project"
              ? "Client project"
              : "Our project")}
        </span>
        <span className="preview-open">
          <ArrowUpRight size={21} />
        </span>
      </button>
      <div className="project-content">
        <span className="project-type">
          {project.type}
          <span>
            {" "}
            /{" "}
            {project.category === "client-project"
              ? "Client project"
              : "Our project"}
          </span>
        </span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Tags items={project.technologies} />
        <ul className="project-features">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <button
          className="project-detail-button"
          onClick={() => onSelect(project)}
        >
          View details <ArrowUpRight size={17} />
        </button>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
