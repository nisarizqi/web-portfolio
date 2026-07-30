import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ImageFallback from './ImageFallback';

export default function FeatureShowcase({
  feature,
  reverse = false,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className={`
        mt-20
        grid
        items-center
        gap-12
        lg:grid-cols-2
        ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}
      `}
    >
      {/* Screenshot */}

      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="
          overflow-hidden
          rounded-3xl
          border
          border-black/5
          bg-gradient-to-br
          from-violet-100
          via-fuchsia-100
          to-blue-100
          shadow-xl
          dark:border-white/10
          dark:from-violet-950
          dark:via-fuchsia-950
          dark:to-slate-900
        "
      >
        <ImageFallback
          src={feature.image}
          alt={feature.title}
          className="w-full aspect-video rounded-2xl object-cover transition duration-500 hover:scale-[1.02]"
        />
      </motion.div>

      {/* Content */}

      <div>
        <span
          className="
            text-xs
            font-mono
            uppercase
            tracking-[0.18em]
            text-light-accent
            dark:text-dark-accent
          "
        >
          Feature
        </span>

        <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          {feature.title}
        </h3>

        <p
          className="
            mt-5
            max-w-lg
            leading-8
            text-light-textSecondary
            dark:text-dark-textSecondary
          "
        >
          {feature.description}
        </p>

        <div className="mt-8 space-y-4">
          {feature.bullets.map((bullet) => (
            <div
              key={bullet}
              className="flex items-start gap-3"
            >
              <div
                className="
                  mt-1
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-100
                  dark:bg-violet-900/40
                "
              >
                <Check
                  size={14}
                  className="text-violet-600 dark:text-violet-300"
                />
              </div>

              <span
                className="
                  text-light-textPrimary
                  dark:text-dark-textPrimary
                "
              >
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}