export default function SectionPlaceholder({ id, label }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-24">
      <div
        className="rounded-2xl border border-dashed border-light-accentSoft/50 dark:border-dark-accentAlt/30
          py-16 text-center text-light-textSecondary dark:text-dark-textSecondary font-mono text-sm"
      >
        {label} — built in the next step
      </div>
    </section>
  );
}
