import { useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TechTag from "../components/common/TechTag";
import FeatureShowcase from "../components/common/FeatureShowcase";
import ImageFallback from '../components/common/ImageFallback';

import { soloHRISCaseStudy } from "../data/caseStudySoloHRIS";

export default function SoloHRISPage() {
  const project = soloHRISCaseStudy;
  const location = useLocation();

  // Handle scroll when coming from navigation with hash
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Delay to ensure page is loaded
    }
  }, [location]);

  return (
    <>
      <Navbar />

      <main className="pt-28 pb-24">
        <section className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm
                text-light-textSecondary dark:text-dark-textSecondary
                hover:text-purple-600 dark:hover:text-purple-400
                transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Selected Work
            </Link>

            <span className="mt-8 block text-xs uppercase tracking-[0.2em] font-mono
              text-purple-600 dark:text-purple-400">
              {project.subtitle}
            </span>

            <h1 className="mt-4 font-display text-5xl md:text-6xl font-semibold tracking-tight">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8
              text-light-textSecondary dark:text-dark-textSecondary">
              {project.tagline}
            </p>
          </motion.div>

          {/* Project Information */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <InfoCard label="Role" value={project.role} />
            <InfoCard label="Company" value={project.company} />
            <InfoCard label="Timeline" value={project.timeline} />
            <InfoCard label="Platform" value={project.platform} />
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-14"
          >
            <div className="overflow-hidden rounded-3xl border border-black/5 dark:border-white/10">
              <ImageFallback
                src={project.heroImage}
                alt={project.title}
                className="aspect-video rounded-2xl object-cover"
              />
            </div>
          </motion.div>

          {/* Overview */}
          <section className="mt-24">
            <SectionHeading title="Overview" />
            <p className="mt-6 max-w-3xl leading-8
              text-light-textSecondary dark:text-dark-textSecondary">
              {project.overview}
            </p>
          </section>

          {/* Feature Walkthrough */}
          <section className="mt-24">
            <SectionHeading title="Feature Walkthrough" />
            <p className="mt-4 max-w-2xl
              text-light-textSecondary dark:text-dark-textSecondary">
              Explore the key workflows designed to make employee attendance
              faster, more secure, and easier to use.
            </p>

            <div className="mt-14 space-y-28">
              {project.walkthrough.map((feature, index) => (
                <FeatureShowcase
                  key={feature.title}
                  feature={feature}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mt-24">
            <SectionHeading title="Tech Stack" />
            <div className="mt-8 flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>
          </section>

          {/* Engineering Challenges */}
          <section className="mt-24">
            <SectionHeading title="Engineering Challenges" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {project.engineeringChallenges.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm
                    dark:border-white/10 dark:bg-dark-surface"
                >
                  <h3 className="font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7
                    text-light-textSecondary dark:text-dark-textSecondary">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section className="mt-24">
            <SectionHeading title="Project Impact" />
            <div className="mt-10 space-y-5">
              {project.impact.map((impact) => (
                <div key={impact}
                  className="flex gap-4 rounded-xl border border-black/5 p-5
                    dark:border-white/10">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-500 shrink-0" />
                  <p className="leading-7
                    text-light-textSecondary dark:text-dark-textSecondary">
                    {impact}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-28 rounded-3xl overflow-hidden
            bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600
            px-10 py-16 text-center text-white">
            <h2 className="font-display text-4xl font-semibold">
              Interested in working together?
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-white/80 leading-8">
              I'm passionate about building mobile applications that solve real
              business problems and create great user experiences.
            </p>

            <Link
              to="/#contact"
              className="mt-10 inline-flex rounded-full bg-white px-8 py-3.5
                font-medium text-purple-700 transition hover:scale-105 hover:shadow-lg"
            >
              Let's Connect
            </Link>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* Helper Components */
function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5
      dark:border-white/10 dark:bg-dark-surface">
      <p className="text-xs uppercase tracking-[0.18em]
        text-light-textSecondary dark:text-dark-textSecondary">
        {label}
      </p>
      <p className="mt-2 font-medium leading-7">
        {value}
      </p>
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <h2 className="font-display text-3xl font-semibold tracking-tight">
      {title}
    </h2>
  );
}