import { motion } from 'framer-motion';
import {
  Smartphone,
  Server,
  Brain,
  Wrench,
} from 'lucide-react';

import SectionHeading from '../../common/SectionHeading';
import GlowCard from '../../common/GlowCard';
import { skillGroups } from '../../../data/skills';

const iconMap = {
  Smartphone,
  Server,
  Brain,
  Wrench,
};

function SkillBadge({ skill, delay = 0 }) {
  return (
    <motion.span
      initial={{
        opacity: 0,
        y: 6,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.25,
        delay,
      }}
      className="
        rounded-full
        border
        border-light-accentSoft/30
        bg-light-blush
        px-3
        py-1.5
        text-xs
        font-medium
        text-light-accent
        dark:border-dark-accent/20
        dark:bg-white/5
        dark:text-dark-accent
      "
    >
      {skill}
    </motion.span>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="
        max-w-6xl
        mx-auto
        px-6
        py-24
        sm:py-28
      "
    >
      <SectionHeading
        eyebrow="Core Skills"
        title="What I Work With"
      />

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
        "
      >
        {skillGroups.map((group, index) => {
          const Icon = iconMap[group.icon];

          return (
            <GlowCard
              key={group.title}
              delay={index * 0.08}
            >
              <div
                className="
                  flex
                  flex-col
                  h-full
                "
              >

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-signature-soft
                      text-white
                      dark:bg-gradient-signature
                    "
                  >
                    <Icon size={20} />
                  </div>


                  {group.featured && (
                    <span
                      className="
                        rounded-full
                        border
                        border-light-accent/20
                        bg-light-blush
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-light-accent
                        dark:border-dark-accent/20
                        dark:bg-white/5
                        dark:text-dark-accent
                      "
                    >
                      Primary Stack
                    </span>
                  )}

                </div>


                <h3
                  className="
                    mt-5
                    mb-4
                    font-display
                    text-lg
                    font-semibold
                  "
                >
                  {group.title}
                </h3>


                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {group.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      delay={
                        index * 0.08 +
                        skillIndex * 0.04
                      }
                    />
                  ))}
                </div>

              </div>
            </GlowCard>
          );
        })}
      </div>

    </section>
  );
}