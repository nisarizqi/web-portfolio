import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionHeading from '../../common/SectionHeading';
import GlowCard from '../../common/GlowCard';
import { certifications } from '../../../data/certifications';

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="
        max-w-6xl
        mx-auto
        px-6
        py-24
        sm:py-28
      "
    >
      <SectionHeading
        eyebrow="Certifications"
        title="Learning & Development"
      />


      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {certifications.map((cert, index) => (
          <GlowCard
            key={cert.title}
            delay={index * 0.1}
          >

            <div>

              {/* Certificate Preview */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.1,
                }}
                className="
                  mb-5
                  overflow-hidden
                  rounded-xl
                  border
                  border-light-accentSoft/20
                  bg-white
                  dark:border-dark-accent/20
                  dark:bg-white/5
                "
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="
                    aspect-[4/3]
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    hover:scale-105
                  "
                  loading="lazy"
                />
              </motion.div>


              {/* Icon */}

              <div
                className="
                  mb-4
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-signature-soft
                  text-white
                  dark:bg-gradient-signature
                "
              >
                <Award size={18} />
              </div>


              {/* Content */}

              <h3
                className="
                  font-display
                  text-base
                  font-semibold
                  leading-snug
                "
              >
                {cert.title}
              </h3>


              <p
                className="
                  mt-2
                  text-sm
                  text-light-textSecondary
                  dark:text-dark-textSecondary
                "
              >
                {cert.issuer}
              </p>


              <p
                className="
                  mt-2
                  font-mono
                  text-xs
                  text-light-accent
                  dark:text-dark-accent
                "
              >
                {cert.year}
              </p>

            </div>

          </GlowCard>
        ))}
      </div>

    </section>
  );
}