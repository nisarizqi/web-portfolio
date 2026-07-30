export default function TechTag({ children }) {
  return (
    <span
      className="text-[11px] font-mono px-2 py-1 rounded-md
        bg-light-blush text-light-accent
        dark:bg-white/5 dark:text-dark-accent
        border border-light-accentSoft/30 dark:border-dark-accent/20"
    >
      {children}
    </span>
  );
}
