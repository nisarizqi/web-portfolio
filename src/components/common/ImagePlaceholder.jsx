import { ImageOff } from 'lucide-react';

export default function ImagePlaceholder({
  label = 'Image Preview',
  className = '',
}) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        bg-light-blush
        text-light-accent

        dark:bg-white/5
        dark:text-dark-accent

        ${className}
      `}
    >
      <ImageOff size={28} />

      <span
        className="
          text-xs
          font-mono
          opacity-70
        "
      >
        {label}
      </span>
    </div>
  );
}