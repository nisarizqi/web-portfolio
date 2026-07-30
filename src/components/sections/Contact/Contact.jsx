import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../../common/SectionHeading';
import { profile } from '../../../data/profile';

const socialLinks = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/putririzqik',
    href: profile.linkedin,
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: 'github.com/nisarizqi',
    href: profile.github,
    icon: Github,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Connect"
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-10"
      >
        <div className="text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
            Open to Mobile Development Opportunities
          </h3>

          <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed 
            text-light-textSecondary dark:text-dark-textSecondary mb-10">
            I'm interested in building reliable and user-focused mobile
            applications, collaborating on meaningful projects, and connecting
            with teams looking for a Mobile Developer.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {socialLinks.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={label === 'Email' ? undefined : '_blank'}
              rel={label === 'Email' ? undefined : 'noreferrer'}
              className="group flex-1 flex items-center gap-3 rounded-2xl
                border border-light-accentSoft/30 dark:border-dark-accent/20
                bg-white/40 dark:bg-white/5
                px-4 py-3
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center 
                rounded-xl bg-light-blush dark:bg-white/5 
                text-light-accent dark:text-dark-accent">
                <Icon size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-light-textSecondary dark:text-dark-textSecondary">
                  {label}
                </p>
                <p className="text-sm font-medium flex items-center gap-1">
                  <span className="truncate">{value}</span>
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-opacity group-hover:opacity-100 shrink-0"
                  />
                </p>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}