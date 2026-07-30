import { Smartphone, Network, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../../common/SectionHeading';
import GlowCard from '../../common/GlowCard';
import { profile } from '../../../data/profile';

const icons = [Smartphone, Network, Heart];

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24 sm:py-28">
      <SectionHeading eyebrow="About Me" title={profile.aboutHeading} />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-2xl text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary mb-12"
      >
        {profile.aboutParagraph}
      </motion.p>

      <div className="grid sm:grid-cols-3 gap-6">
        {profile.aboutPillars.map((pillar, i) => {
          const Icon = icons[i];
          return (
            <GlowCard key={pillar.title} delay={i * 0.1}>
              <div
                className="h-11 w-11 rounded-xl flex items-center justify-center mb-4
                  bg-light-blush text-light-accent dark:bg-white/5 dark:text-dark-accent"
              >
                <Icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {pillar.description}
              </p>
            </GlowCard>
          );
        })}
      </div>
    </section>
  );
}
