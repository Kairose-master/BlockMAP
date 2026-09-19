"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, User } from "lucide-react";

const TABS = [
  { href: "/app", label: "HOME", icon: Home },
  { href: "/app/map", label: "MAP", icon: Map },
  { href: "/app/my", label: "MY", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="하단 내비게이션"
      className="glass-panel absolute inset-x-4 bottom-4 z-30 flex h-[68px] items-center gap-1 rounded-[24px] p-1.5"
    >
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`relative flex h-full flex-1 flex-col items-center justify-center gap-0.5 rounded-[18px] text-[10px] font-bold tracking-[0.08em] transition-colors ${
              active ? "bg-white/[0.06] text-ink" : "text-ink-3"
            }`}
          >
            {active && <span className="absolute top-1 h-0.5 w-5 rounded-full bg-lime shadow-[0_0_10px_rgba(120,247,197,0.7)]" />}
            <Icon size={19} strokeWidth={active ? 2.2 : 1.8} className={active ? "text-lime" : ""} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
