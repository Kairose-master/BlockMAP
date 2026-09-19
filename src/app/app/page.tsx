"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Share2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ShareCard } from "@/components/ShareCard";
import { COINS, PLACES, PLACE_BY_ID, QUESTS, placesForCoins } from "@/lib/data";
import { heldSymbols, useStore } from "@/lib/store";
import { formatKRW, usePrices } from "@/lib/usePrices";

export default function HomePage() {
  const prices = usePrices();
  const nickname = useStore((s) => s.nickname);
  const holdings = useStore((s) => s.holdings);
  const visited = useStore((s) => s.visited);
  const myReviews = useStore((s) => s.myReviews);

  const mine = heldSymbols(holdings);
  const total = mine.reduce((sum, s) => sum + (holdings[s] ?? 0) * (prices[s]?.price ?? 0), 0);
  const reachable = placesForCoins(mine);
  const unvisited = reachable.filter((p) => !visited[p.id]);
  const easyPicks = [...unvisited].sort((a, b) => a.difficulty - b.difficulty || a.minKRW - b.minKRW).slice(0, 4);

  // 거래소·지갑(출발지)은 '쓰는 곳'이 아니므로 쓰임처 수에서 뺀다
  const usePlaces = PLACES.filter((p) => p.district !== "start");
  const ranking = COINS.map((c) => ({ coin: c, count: usePlaces.filter((p) => p.coins.includes(c.symbol)).length })).sort(
    (a, b) => b.count - a.count,
  );
  const [showAllCoins, setShowAllCoins] = useState(false);
  const [sharing, setSharing] = useState(false);
  const shownRanking = showAllCoins ? ranking : ranking.slice(0, 8);

  const recentReviews = [
    ...Object.entries(myReviews).flatMap(([placeId, list]) => list.map((rv) => ({ placeId, rv }))),
    ...PLACES.flatMap((p) => p.reviews.map((rv) => ({ placeId: p.id, rv }))),
  ].slice(0, 5);

  return (
    <main className="no-scrollbar h-full overflow-y-auto pb-28">
      <header className="flex items-center justify-between px-5 pt-6">
        <Logo />
      </header>

      <section className="px-5 pt-6">
        <h1 className="text-2xl font-extrabold">반가워요, {nickname}님</h1>
        <p className="mt-1 text-sm text-ink-2">오늘은 코인을 &lsquo;보는&rsquo; 대신 &lsquo;써볼&rsquo; 차례예요.</p>
      </section>

      <section className="px-5 pt-5">
        {mine.length === 0 ? (
          <Link href="/app/my" className="block rounded-3xl border border-line bg-surface p-5 active:opacity-80">
            <p className="text-[15px] font-bold">어떤 코인을 갖고 있나요?</p>
            <p className="mt-1 text-sm text-ink-2">보유 코인을 알려주면 갈 수 있는 곳만 지도에 밝혀드려요.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-lime">
              내 코인 등록하기 <ArrowRight size={16} />
            </span>
          </Link>
        ) : (
          <div className="rounded-3xl bg-lime p-5 text-lime-ink">
            <p className="text-xs font-bold opacity-70">지갑에서 잠자는 내 코인 · 업비트 시세</p>
            <p className="mt-1 text-3xl font-extrabold">{total > 0 ? formatKRW(total) : "—"}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {mine.map((s) => {
                const rate = prices[s]?.changeRate;
                return (
                  <span key={s} className="rounded-full bg-black/10 px-2.5 py-1 text-xs font-bold">
                    {s} {holdings[s]}
                    {rate !== undefined && <span className="opacity-60"> {rate >= 0 ? "+" : ""}{(rate * 100).toFixed(1)}%</span>}
                  </span>
                );
              })}
            </div>
            <div className="mt-4 flex gap-2">
              <Link href="/app/map?filter=mine" className="flex h-12 min-w-0 flex-1 items-center justify-between rounded-2xl bg-lime-ink px-4 text-sm font-bold text-lime">
                <span className="truncate">이 코인으로 갈 수 있는 곳 {reachable.length}곳</span>
                <ArrowRight size={18} className="shrink-0" />
              </Link>
              <button type="button" aria-label="공유 카드 만들기" onClick={() => setSharing(true)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-ink text-lime">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="pt-8">
        <h2 className="px-5 text-lg font-extrabold">처음이라면 이 길부터</h2>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5">
          {QUESTS.map((q) => {
            const done = q.placeIds.filter((id) => visited[id]).length;
            const next = q.placeIds.find((id) => !visited[id]) ?? q.placeIds[0];
            return (
              <Link key={q.id} href={`/app/map?place=${next}`} className="w-[240px] shrink-0 rounded-3xl border border-line bg-surface p-4 active:opacity-80">
                <p className="text-[15px] font-bold">{q.title}</p>
                <p className="mt-0.5 text-xs text-ink-2">{q.desc}</p>
                <ol className="mt-3 space-y-1.5">
                  {q.placeIds.map((id) => (
                    <li key={id} className={`flex items-center gap-2 text-sm ${visited[id] ? "text-lime" : "text-ink-2"}`}>
                      <span className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border ${visited[id] ? "border-lime bg-lime text-lime-ink" : "border-line"}`}>
                        {visited[id] && <Check size={12} strokeWidth={3} />}
                      </span>
                      {PLACE_BY_ID[id].action}
                    </li>
                  ))}
                </ol>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-lime" style={{ width: `${(done / q.placeIds.length) * 100}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-5 pt-8">
        <h2 className="text-lg font-extrabold">{mine.length > 0 ? "내 코인으로 지금 해볼 만한 것" : "가장 쉬운 쓰임처"}</h2>
        <ul className="mt-3 space-y-2">
          {easyPicks.map((p) => (
            <li key={p.id}>
              <Link href={`/app/map?place=${p.id}`} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 active:opacity-80">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-bold">{p.action}</p>
                  <p className="mt-0.5 truncate text-xs text-ink-2">
                    {p.domain} · 약 {p.minutes}분 · {p.minKRW === 0 ? "무료" : `${formatKRW(p.minKRW)}부터`}
                  </p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-ink-3" />
              </Link>
            </li>
          ))}
          {easyPicks.length === 0 && <li className="rounded-2xl bg-surface px-4 py-5 text-center text-sm text-ink-2">갈 수 있는 곳을 전부 가봤어요. 대단해요!</li>}
        </ul>
      </section>

      <section className="px-5 pt-8">
        <h2 className="text-lg font-extrabold">코인별 쓰임처 수</h2>
        <p className="mt-1 text-xs text-ink-3">거래소·지갑을 뺀 &lsquo;실제로 쓰는 곳&rsquo;만 셌어요. 가격은 업비트 기준.</p>
        <ul className="mt-3 space-y-1.5">
          {shownRanking.map(({ coin: c, count }) => (
            <li key={c.symbol}>
              <Link href={`/coin/${c.symbol.toLowerCase()}`} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 active:opacity-80">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                <span className="w-24 shrink-0 truncate text-sm font-bold">{c.name}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-lime" style={{ width: `${(count / ranking[0].count) * 100}%` }} />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-bold text-lime">{count}곳</span>
                <span className="w-16 shrink-0 text-right text-xs text-ink-2">{prices[c.symbol] ? formatKRW(prices[c.symbol].price) : "—"}</span>
                <ChevronRight size={16} className="shrink-0 text-ink-3" />
              </Link>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setShowAllCoins((v) => !v)} className="mt-2 h-10 w-full rounded-2xl border border-line text-sm font-semibold text-ink-2">
          {showAllCoins ? "접기" : `코인 ${ranking.length}종 전체 보기`}
        </button>
        <Link href="/coin" className="mt-2 block text-center text-xs font-semibold text-ink-3 underline">
          코인별 쓰임처 페이지로 보기 (공유용)
        </Link>
      </section>

      <section className="px-5 pt-8">
        <h2 className="text-lg font-extrabold">이런 후기가 쌓여요</h2>
        <ul className="mt-3 space-y-2">
          {recentReviews.map(({ placeId, rv }) => (
            <li key={rv.id}>
              <Link href={`/app/map?place=${placeId}`} className="block rounded-2xl bg-surface px-4 py-3.5 active:opacity-80">
                <p className="text-xs font-bold text-lime">{PLACE_BY_ID[placeId].action}</p>
                <p className="mt-1 text-[15px] leading-relaxed">{rv.body}</p>
                <p className="mt-1.5 text-xs text-ink-3">
                  {rv.sample && <span className="mr-1.5 rounded bg-line px-1.5 py-0.5 text-[10px] font-bold text-ink-2">예시</span>}
                  {rv.author}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {sharing && <ShareCard onClose={() => setSharing(false)} />}
    </main>
  );
}
