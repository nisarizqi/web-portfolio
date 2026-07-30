import SectionHeading from '../../common/SectionHeading';
import FeaturedProject from './FeaturedProject';
import ProjectCard from './ProjectCard';
import { projects } from '../../../data/projects';

export default function Projects() {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-6 py-24 sm:py-28"
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="Real Problems. Real Solutions."
      />

      <FeaturedProject project={featuredProject} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={index * 0.08}
          />
        ))}
      </div>
    </section>
  );
}