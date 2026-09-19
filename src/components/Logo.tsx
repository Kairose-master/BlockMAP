export function Logo({ size = 22 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-extrabold tracking-tight" style={{ fontSize: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"
          fill="none"
          stroke="var(--color-lime)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.6" fill="var(--color-lime)" />
      </svg>
      <span>
        BLOCK<span className="text-lime">MAP</span>
      </span>
    </span>
  );
}
