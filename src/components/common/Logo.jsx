import React from "react";

export default function Logo({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient Techy Feminine yang sama */}
        <linearGradient
          id="techy-feminine-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#E0116D" />
          <stop offset="100%" stopColor="#B565F5" />
        </linearGradient>
      </defs>

      {/* Batang vertikal huruf 'K' */}
      <rect
        x="50"
        y="40"
        width="24"
        height="120"
        rx="12"
        fill="url(#techy-feminine-gradient)"
      />

      {/* Garis diagonal atas 'K' */}
      <rect
        x="115"
        y="45"
        width="24"
        height="85"
        rx="12"
        transform="rotate(35 115 45)"
        fill="url(#techy-feminine-gradient)"
      />

      {/* Garis diagonal bawah 'K' */}
      <rect
        x="110"
        y="100"
        width="24"
        height="85"
        rx="12"
        transform="rotate(-35 110 100)"
        fill="url(#techy-feminine-gradient)"
      />

      {/* Aksen Sparkle / Tech Star di posisi yang pas */}
      <path
        d="M 165 15 Q 165 40 190 40 Q 165 40 165 65 Q 165 40 140 40 Q 165 40 165 15 Z"
        fill="#FF2E9F"
      />
    </svg>
  );
}
