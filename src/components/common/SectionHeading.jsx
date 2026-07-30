import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
    >
      <span className="inline-block font-mono text-xs tracking-widest uppercase
        text-light-accent dark:text-dark-accent mb-3">
        {eyebrow}
      </span>
      <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}
