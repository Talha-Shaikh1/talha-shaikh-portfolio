import { type SVGProps } from "react";

interface BrandLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function BrandLogo({ size = 30, className, ...props }: BrandLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="headerLogoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#181512" />
          <stop offset="100%" stopColor="#0e0c0a" />
        </linearGradient>
        <linearGradient id="headerLogoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#d97736" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <filter id="headerLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Rounded Squircle Shield */}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#headerLogoBg)"
        stroke="#3a2f26"
        strokeWidth="1.5"
      />

      {/* Subtle Matrix Ring Accent */}
      <circle
        cx="32"
        cy="32"
        r="22"
        stroke="url(#headerLogoAccent)"
        strokeOpacity="0.18"
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* Monogram T */}
      <path
        d="M16 19 C16 17.5 17.5 16 19 16 L45 16 C46.5 16 48 17.5 48 19 L48 23 C48 24 47 25 46 25 L35 25 L35 46 C35 47.5 33.5 49 32 49 L30 49 C28.5 49 27 47.5 27 46 L27 25 L18 25 C17 25 16 24 16 23 Z"
        fill="url(#headerLogoAccent)"
        filter="url(#headerLogoGlow)"
      />

      {/* Live Indicator Dot */}
      <circle
        cx="45"
        cy="45"
        r="3.5"
        fill="#10b981"
        stroke="#0e0c0a"
        strokeWidth="1"
      />
    </svg>
  );
}
