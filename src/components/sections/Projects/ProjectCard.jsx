import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import GlowCard from "../../common/GlowCard";
import TechTag from "../../common/TechTag";
import ImageFallback from '../../common/ImageFallback';

export default function ProjectCard({ project, delay = 0 }) {
  return (
    <GlowCard
      delay={delay}
      className="group flex h-full flex-col overflow-hidden p-0"
    >
      {/* Cover */}
      <div className="relative overflow-hidden">
        {/* <img
          src={project.cover}
          alt={project.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        /> */}
        <ImageFallback
          src={project.cover}
          alt={project.title}
          label="Project Screenshot"
          className="
    aspect-video
    rounded-2xl
    object-cover
  "
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Tag */}
        <span
          className="absolute left-4 top-4 rounded-full
          bg-white/90 px-3 py-1 text-[11px] font-medium
          backdrop-blur dark:bg-black/50"
        >
          {project.tag}
        </span>

        {/* Year */}
        <span
          className="absolute right-4 top-4 rounded-full
          bg-black/40 px-3 py-1 text-[11px]
          font-medium text-white backdrop-blur"
        >
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold">{project.title}</h3>

        <p
          className="mt-1 text-sm font-medium
          text-light-accent dark:text-dark-accent"
        >
          {project.subtitle}
        </p>

        <p
          className="mt-4 line-clamp-3 text-sm leading-7
          text-light-textSecondary dark:text-dark-textSecondary"
        >
          {project.summary}
        </p>

        {/* Tech */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-auto flex items-center justify-between
          border-t border-black/5 pt-5
          dark:border-white/10"
        >
          {project.caseStudySlug ? (
            <Link
              to={`/${project.caseStudySlug}`}
              className="inline-flex items-center gap-1.5
              text-sm font-medium
              text-light-accent transition-all
              hover:gap-2.5
              dark:text-dark-accent"
            >
              View Project
              <ArrowUpRight size={15} />
            </Link>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2
                text-light-textSecondary
                transition
                hover:bg-black/5
                hover:text-light-accent
                dark:text-dark-textSecondary
                dark:hover:bg-white/10
                dark:hover:text-dark-accent"
              >
                <Github size={18} />
              </a>
            )}

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2
                text-light-textSecondary
                transition
                hover:bg-black/5
                hover:text-light-accent
                dark:text-dark-textSecondary
                dark:hover:bg-white/10
                dark:hover:text-dark-accent"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
