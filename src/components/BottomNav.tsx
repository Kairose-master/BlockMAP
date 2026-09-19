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
      className="absolute inset-x-4 bottom-4 z-30 flex h-[68px] items-center gap-1 rounded-[28px] border border-line bg-surface/90 p-1.5 backdrop-blur-md"
    >
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex h-full flex-1 flex-col items-center justify-center gap-0.5 rounded-[22px] text-[11px] font-semibold tracking-wide transition-colors ${
              active ? "bg-surface-2 text-ink" : "text-ink-3"
            }`}
          >
            <Icon size={20} strokeWidth={2.2} className={active ? "text-lime" : ""} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
