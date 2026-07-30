import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

import SectionHeading from '../../common/SectionHeading';
import { experiences, education } from '../../../data/experience';

function SkillBadge({ skill }) {
  return (
    <span
      className="
        text-xs
        font-medium
        px-2.5
        py-1
        rounded-full
        bg-light-blush
        text-light-accent
        border
        border-light-accentSoft/30
        dark:bg-white/5
        dark:text-dark-accent
        dark:border-dark-accent/20
      "
    >
      {skill}
    </span>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="
        max-w-6xl
        mx-auto
        px-6
        py-24
        sm:py-28
      "
    >
      <SectionHeading
        eyebrow="Experience"
        title="Work Experience"
      />


      <div className="relative pl-8 sm:pl-10">

        {/* Timeline */}
        <div
          aria-hidden
          className="
            absolute
            left-[7px]
            sm:left-[9px]
            top-2
            bottom-2
            w-px
            bg-gradient-to-b
            from-light-accent/50
            via-light-accentSoft/30
            to-transparent
            dark:from-dark-accent/60
            dark:via-dark-accentAlt/30
          "
        />


        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{
              opacity: 0,
              x: -12,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: '-60px',
            }}
            transition={{
              duration: 0.45,
              delay: i * 0.1,
            }}
            className="
              relative
              mb-12
              last:mb-0
            "
          >

            {/* Dot */}
            <span
              className="
                absolute
                -left-8
                sm:-left-10
                top-1.5
                h-3.5
                w-3.5
                rounded-full
                bg-gradient-signature
                shadow-glow
              "
            />


            {/* Header */}
            <div className="mb-3">

              <h3
                className="
                  font-display
                  font-semibold
                  text-lg
                "
              >
                {exp.role}
              </h3>


              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-2
                  text-sm
                  text-light-textSecondary
                  dark:text-dark-textSecondary
                "
              >
                <span>
                  {exp.company}
                </span>

                <span>
                  ·
                </span>

                <span
                  className="
                    font-mono
                    text-xs
                  "
                >
                  {exp.period}
                </span>
              </div>

            </div>


            {/* Skills */}
            <div
              className="
                flex
                flex-wrap
                gap-2
                mb-4
              "
            >
              {exp.skills.map((skill) => (
                <SkillBadge
                  key={skill}
                  skill={skill}
                />
              ))}
            </div>


            {/* Description */}
            <ul className="space-y-1.5">

              {exp.points.map((point) => (
                <li
                  key={point}
                  className="
                    text-sm
                    text-light-textSecondary
                    dark:text-dark-textSecondary
                    leading-relaxed
                    pl-4
                    relative

                    before:content-['—']
                    before:absolute
                    before:left-0
                    before:text-light-accentSoft
                    dark:before:text-dark-accentAlt
                  "
                >
                  {point}
                </li>
              ))}

            </ul>

          </motion.div>
        ))}

      </div>


      {/* Education */}

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.45,
        }}
        className="
          mt-12
          ml-0
          sm:ml-2
          glass-card
          rounded-2xl
          p-6
          flex
          items-start
          gap-4
        "
      >

        <div
          className="
            h-11
            w-11
            shrink-0
            rounded-xl
            flex
            items-center
            justify-center
            bg-light-blush
            text-light-accent
            dark:bg-white/5
            dark:text-dark-accent
          "
        >
          <GraduationCap size={20} />
        </div>


        <div>

          <h3
            className="
              font-display
              font-semibold
              text-base
              mb-1
            "
          >
            {education.degree}
            {' — '}
            {education.institution}
          </h3>


          <p
            className="
              text-xs
              font-mono
              text-light-textSecondary
              dark:text-dark-textSecondary
              mb-2
            "
          >
            {education.period}
            {' · '}
            GPA {education.gpa}
          </p>


          <p
            className="
              text-sm
              text-light-textSecondary
              dark:text-dark-textSecondary
              leading-relaxed
            "
          >
            {education.coursework}
          </p>

        </div>

      </motion.div>

    </section>
  );
}