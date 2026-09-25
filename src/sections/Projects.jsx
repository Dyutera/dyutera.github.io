import { useState } from "react";
import { FolderOpen } from "lucide-react";
import { Reveal, SectionHeading, Button } from "../components/UI";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { projects, projectFilters } from "../data/projects";
import { copy } from "../data/content";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const visible = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <Reveal className="projects-heading">
          <SectionHeading {...copy.projects} />
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {projectFilters.map((item) => (
              <button
                key={item.id}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>
        <p className="sr-only" role="status">
          {visible.length} projects shown
        </p>
        {visible.length > 0 ? (
          <div className="projects-grid">
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <FolderOpen size={34} />
            <h3>Good work deserves a proper introduction.</h3>
            <p>
              Approved client projects will be shared here when available. In
              the meantime, explore our illustrative product concepts.
            </p>
            <Button secondary onClick={() => setFilter("our-project")}>
              Explore our projects
            </Button>
          </div>
        )}
        <p className="project-disclaimer">
          <span className="tiny-dot" />
          These concepts illustrate possible solutions. They are not completed
          products or client deliveries.
        </p>
      </div>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
