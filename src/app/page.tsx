import Link from "next/link";
import { ArrowUpRight, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";

const STATS = [
  { value: "122", label: "검증된 쓰임처" },
  { value: "32", label: "지원 코인" },
  { value: "8", label: "탐색 구역" },
];

export default function Landing() {
  return (
    <main className="no-scrollbar hairline-grid h-full overflow-y-auto px-5 pb-7 pt-6">
      <header className="rise-in flex items-center justify-between">
        <Logo size={20} />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] text-ink-2 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_rgba(120,247,197,0.9)]" />
          Live map
        </span>
      </header>

      <section className="rise-in-delay pt-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-lime uppercase">
          <Sparkles size={14} />
          Beyond the wallet
        </div>
        <h1 className="text-balance mt-4 text-[40px] font-extrabold leading-[1.08] tracking-[-0.055em]">
          가진 코인을,
          <br />
          <span className="bg-gradient-to-r from-lime via-[#a7ffe1] to-[#7fd5ff] bg-clip-text text-transparent">쓸 수 있는 곳으로.</span>
        </h1>
        <p className="text-balance mt-4 max-w-[360px] text-[15px] leading-6 text-ink-2">
          지갑 속 자산이 실제로 연결되는 서비스와 경험을 한눈에 탐색하세요. 검증된 공식 주소와 다음 단계까지 안내합니다.
        </p>
      </section>

      <section className="relative mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-surface shadow-[0_28px_80px_rgba(0,0,0,0.38)]">
        <div
          className="min-h-[286px] bg-[linear-gradient(180deg,transparent_48%,rgba(5,10,13,0.92)_100%),url('/blockmap-hero.webp')] bg-cover bg-center"
          aria-label="디지털 자산의 쓰임처를 연결한 추상 지도"
        >
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-bold tracking-[0.08em] text-white/80 backdrop-blur-md">
              UTILITY NETWORK
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-lime backdrop-blur-md">
              <MapPinned size={16} />
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#08100f]/70 px-3 py-3 backdrop-blur-lg">
                <p className="text-xl font-extrabold tracking-[-0.04em] text-white">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 space-y-2.5">
        <Link
          href="/app/map"
          className="flex h-14 w-full items-center justify-between rounded-2xl bg-lime px-5 text-[15px] font-extrabold text-lime-ink shadow-[0_14px_36px_rgba(120,247,197,0.15)]"
        >
          지도에서 쓰임처 탐색하기
          <ArrowUpRight size={19} />
        </Link>
        <Link
          href="/coin"
          className="glass-panel flex h-14 w-full items-center justify-between rounded-2xl px-5 text-[15px] font-bold text-ink"
        >
          내 코인으로 가능한 일 보기
          <span className="text-xs font-semibold text-ink-3">32 COINS</span>
        </Link>
      </section>

      <footer className="mt-6 flex items-start gap-2.5 border-t border-white/[0.06] pt-5 text-[11px] leading-5 text-ink-3">
        <ShieldCheck size={15} className="mt-0.5 shrink-0 text-lime" />
        <p>
          공식 도메인과 실제 사용 경로만 안내합니다. BlockMAP은 결제나 교환을 중개하지 않으며 투자 조언을 제공하지 않습니다.
        </p>
      </footer>
    </main>
  );
}
