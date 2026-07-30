import { motion } from 'framer-motion';

export default function GlowCard({ children, className = '', delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`glass-card rounded-2xl p-6 shadow-soft dark:shadow-none
        hover:shadow-glow dark:hover:shadow-glow transition-shadow duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
