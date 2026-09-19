import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PublicShell } from "@/components/PublicShell";
import { ShareButton } from "@/components/ShareButton";
import { COINS, PLACES, usesOf } from "@/lib/data";

const usePlaceCount = PLACES.filter((p) => p.district !== "start").length;

export const metadata: Metadata = {
  title: "코인별 쓰임처 수 — 내 코인, 실제로 어디에 쓸 수 있나",
  description: `비트코인·이더리움·리플·도지 등 ${COINS.length}개 코인을 '가격'이 아니라 '쓸 수 있는 곳'의 수로 줄 세웠습니다. 거래소·지갑을 뺀 실제 쓰임처 ${usePlaceCount}곳 기준.`,
  alternates: { canonical: "/coin" },
};

export default function CoinIndexPage() {
  const ranking = COINS.map((c) => ({ coin: c, count: usesOf(c.symbol).length })).sort((a, b) => b.count - a.count);
  const max = ranking[0].count;

  return (
    <PublicShell>
      <h1 className="text-[26px] font-extrabold leading-tight">
        내 코인, 실제로
        <br />
        <span className="text-lime">어디에 쓸 수 있을까</span>
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
        시가총액 순위는 어디에나 있지만 &lsquo;쓸 수 있는 곳&rsquo; 순위는 없었어요. 거래소와 지갑을 빼고, 실제로 무언가를 할 수 있는 곳만
        셌습니다. 검증된 쓰임처 {usePlaceCount}곳 기준.
      </p>

      <ol className="mt-6 space-y-1.5">
        {ranking.map(({ coin, count }, i) => (
          <li key={coin.symbol}>
            <Link href={`/coin/${coin.symbol.toLowerCase()}`} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 active:opacity-80">
              <span className="w-5 shrink-0 text-center text-xs font-bold text-ink-3">{i + 1}</span>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: coin.color }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold">
                  {coin.name} <span className="text-xs font-semibold text-ink-3">{coin.symbol}</span>
                </p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-lime" style={{ width: `${(count / max) * 100}%` }} />
                </div>
              </div>
              <span className="w-10 shrink-0 text-right text-sm font-extrabold text-lime">{count}곳</span>
              <ChevronRight size={16} className="shrink-0 text-ink-3" />
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <ShareButton
          title="코인별 쓰임처 수"
          text={`코인을 '쓸 수 있는 곳' 수로 줄 세우면? 1위 ${ranking[0].coin.name} ${ranking[0].count}곳.`}
          path="/coin"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-line text-sm font-bold active:opacity-70"
        />
      </div>
    </PublicShell>
  );
}
