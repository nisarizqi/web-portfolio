import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { navLinks } from '../../data/navLinks';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display font-semibold tracking-tight
            bg-gradient-signature bg-clip-text text-transparent">
            khairunnisaaptr.my.id
          </p>
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
            © {new Date().getFullYear()} {profile.name}. Built with React & Tailwind.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-light-textSecondary dark:text-dark-textSecondary
                hover:text-light-accent dark:hover:text-dark-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} aria-label="Email"
            className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors">
            <Mail size={17} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"
            className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors">
            <Github size={17} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors">
            <Linkedin size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
