export default function Logo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Hexagone (Hive) */}
      <path
        d="M18 2.5L31.5 10.25V25.75L18 33.5L4.5 25.75V10.25L18 2.5Z"
        stroke="url(#logo-gradient)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* Pixels intérieurs */}
      <rect x="12" y="12" width="4" height="4" rx="1" fill="url(#logo-gradient)" />
      <rect x="20" y="12" width="4" height="4" rx="1" fill="url(#logo-gradient)" />
      <rect x="12" y="20" width="4" height="4" rx="1" fill="url(#logo-gradient)" />
      <rect x="20" y="20" width="4" height="4" rx="1" fill="url(#logo-gradient)" opacity="0.4" />
    </svg>
  );
}
