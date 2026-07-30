import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "../../../data/profile";
import profilePic from "/assets/images/profile_photo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const scrollToProjects = () => {
  const section = document.getElementById("projects");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full
          bg-gradient-to-br from-purple-300/20 via-pink-300/20 to-blue-300/20
          dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full
          bg-gradient-to-tr from-blue-300/20 to-purple-300/20
          dark:from-blue-500/10 dark:to-purple-500/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 md:grid-cols-[1.1fr,0.9fr]">
        {/* LEFT */}
        <div>
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full 
              border border-purple-200/30 glass-card px-4 py-1.5 
              text-xs font-medium tracking-wide
              text-purple-700 dark:border-purple-400/20 dark:text-purple-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {profile.heroBadge}
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-light-textPrimary dark:text-dark-textPrimary">
                Hi, I'm{" "}
              </span>
              <span
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 
                bg-clip-text text-transparent bg-size-200 animate-gradient"
              >
                {profile.name}
              </span>
            </h1>
            <h2 className="mt-3 text-2xl font-medium text-light-textSecondary dark:text-dark-textSecondary">
              {profile.role}
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-lg text-base leading-relaxed sm:text-lg 
              text-light-textSecondary dark:text-dark-textSecondary"
          >
            {profile.heroSubheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r 
                from-purple-600 via-pink-500 to-purple-600 
                bg-size-200 hover:bg-pos-100
                px-8 py-3.5 text-sm font-medium text-white
                shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 
                transition-all duration-500"
            >
              View Projects
            </motion.button>

            <motion.a
              href={profile.resumeUrl}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full
                border-2 border-purple-300/50 dark:border-purple-400/30
                px-8 py-3.5 text-sm font-medium
                text-light-textPrimary dark:text-dark-textPrimary
                hover:bg-purple-50 dark:hover:bg-purple-900/20 
                hover:border-purple-400 dark:hover:border-purple-400/50
                transition-all duration-300"
            >
              <Download size={16} />
              Resume
            </motion.a>
          </motion.div>

          {/* Social & Location */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex items-center gap-5 
              text-light-textSecondary dark:text-dark-textSecondary"
          >
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              <Github size={22} />
            </motion.a>

            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              <Linkedin size={22} />
            </motion.a>

            <div className="h-5 w-px bg-light-border dark:bg-dark-border" />

            <div className="flex items-center gap-1.5 text-sm">
              <MapPin size={16} className="text-purple-500 flex-shrink-0" />
              <span>{profile.location}</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mx-auto"
        >
          <motion.div
            className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-[360px] lg:w-[360px]"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Glow */}
            <div
              aria-hidden
              className="absolute inset-0 rotate-6 rounded-[2rem]
      bg-gradient-signature-soft opacity-40 dark:opacity-30"
            />

            {/* Image */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[2rem]
      glass-card shadow-glow
      ring-1 ring-white/20 dark:ring-white/5"
            >
              <img
                src={profilePic}
                alt={profile.name}
                className="h-full w-full object-cover"
              />

              {/* Open to Work Badge */}
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 
          px-4 py-1.5 rounded-full backdrop-blur-lg
          bg-emerald-500/90 border border-white/30
          shadow-lg shadow-emerald-500/30 
          flex items-center gap-2 whitespace-nowrap"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inset-0 rounded-full bg-white opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-white" />
                </span>
                <span className="text-xs font-medium text-white tracking-wide">
                  Open to Work
                </span>
              </motion.div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2
          flex-col items-center gap-2 
          text-light-textSecondary dark:text-dark-textSecondary
          hover:text-purple-500 dark:hover:text-purple-400 transition-colors sm:flex"
      >
        <span className="text-xs font-mono tracking-wider">SCROLL</span>
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
