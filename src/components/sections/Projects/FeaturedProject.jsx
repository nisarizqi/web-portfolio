import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechTag from '../../common/TechTag';
import ImageFallback from '../../common/ImageFallback';

export default function FeaturedProject({ project }) {
  if (!project) return null;

  return (
    <section
      className="group mb-20 overflow-hidden rounded-3xl
      border border-black/5 bg-white shadow-sm
      transition-all duration-300 hover:shadow-xl
      dark:border-white/10 dark:bg-dark-surface"
    >
      <div className="grid lg:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-100 via-fuchsia-100 to-blue-100 dark:from-violet-950 dark:via-fuchsia-950 dark:to-slate-900">

          <ImageFallback
            label="Project Screenshot"
            src={project.cover}
            alt={project.title}
            className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t
            from-black/20 via-transparent to-transparent"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col p-8 lg:p-10">

          <div className="mb-5 flex items-center justify-between">

            <span
              className="rounded-full bg-violet-100
              px-3 py-1 text-xs font-medium
              text-violet-700
              dark:bg-violet-900/40
              dark:text-violet-300"
            >
              {project.tag}
            </span>

            <span
              className="text-sm text-light-textSecondary
              dark:text-dark-textSecondary"
            >
              {project.year}
            </span>

          </div>

          <h2 className="font-display text-4xl font-semibold">
            {project.title}
          </h2>

          <p
            className="mt-2 text-lg font-medium
            text-light-accent
            dark:text-dark-accent"
          >
            {project.subtitle}
          </p>

          <p
            className="mt-6 leading-8
            text-light-textSecondary
            dark:text-dark-textSecondary"
          >
            {project.summary}
          </p>

          {/* Tech */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <TechTag key={item}>{item}</TechTag>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto flex flex-wrap items-center gap-5 pt-10">

            {project.caseStudySlug && (
              <Link
                to={`/${project.caseStudySlug}`}
                className="inline-flex items-center gap-2 rounded-full
                bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600
                px-6 py-3 text-sm font-medium text-white
                transition hover:scale-[1.02]"
              >
                Read Case Study
                <ArrowUpRight size={16} />
              </Link>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2
                text-sm
                text-light-textSecondary
                hover:text-light-accent
                dark:text-dark-textSecondary
                dark:hover:text-dark-accent"
              >
                <Github size={18} />
                GitHub
              </a>
            )}

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2
                text-sm
                text-light-textSecondary
                hover:text-light-accent
                dark:text-dark-textSecondary
                dark:hover:text-dark-accent"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}