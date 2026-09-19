export function Logo({ size = 22 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-extrabold tracking-[-0.04em]" style={{ fontSize: size }}>
      <span
        className="flex items-center justify-center rounded-[30%] border border-lime/30 bg-lime/10 shadow-[0_0_24px_rgba(120,247,197,0.12)]"
        style={{ width: size + 5, height: size + 5 }}
      >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2.5 3.5 7.2v9.6l8.5 4.7 8.5-4.7V7.2L12 2.5Z"
          fill="none"
          stroke="var(--color-lime)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M7.5 13.8 12 8l4.5 5.8" fill="none" stroke="var(--color-lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14.6" r="1.7" fill="var(--color-lime)" />
      </svg>
      </span>
      <span>
        Block<span className="text-lime">MAP</span>
      </span>
    </span>
  );
}
