import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { LivePrice } from "@/components/LivePrice";
import { PublicShell } from "@/components/PublicShell";
import { ShareButton } from "@/components/ShareButton";
import { COINS, DISTRICTS, startsOf, usesOf, type Coin, type Place } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const DIFFICULTY = { 1: "쉬움", 2: "보통", 3: "어려움" } as const;
const won = (n: number) => (n === 0 ? "무료" : `${n.toLocaleString("ko-KR")}원부터`);

const findCoin = (symbol: string): Coin | undefined => COINS.find((c) => c.symbol.toLowerCase() === symbol.toLowerCase());

export function generateStaticParams() {
  return COINS.map((c) => ({ symbol: c.symbol.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps<"/coin/[symbol]">): Promise<Metadata> {
  const { symbol } = await params;
  const coin = findCoin(symbol);
  if (!coin) return {};
  const uses = usesOf(coin.symbol);
  const top = uses.slice(0, 3).map((p) => p.action).join(", ");
  return {
    title: `${coin.name}(${coin.symbol}) 사용처 — ${coin.symbol}로 할 수 있는 일 ${uses.length}가지`,
    description: `${coin.about} ${coin.note} ${top ? `예: ${top}.` : ""}`.slice(0, 200),
    alternates: { canonical: `/coin/${coin.symbol.toLowerCase()}` },
  };
}

export default async function CoinPage({ params }: PageProps<"/coin/[symbol]">) {
  const { symbol } = await params;
  const coin = findCoin(symbol);
  if (!coin) notFound();

  const uses = usesOf(coin.symbol);
  const starts = startsOf(coin.symbol).filter((p) => p.coins.length < COINS.length); // 거래소(모든 코인)는 빼고 지갑만
  const groups = DISTRICTS.map((d) => ({ district: d, places: uses.filter((p) => p.district === d.id) })).filter((g) => g.places.length > 0);
  const coverage = DISTRICTS.filter((d) => d.id !== "start").map((d) => ({ district: d, count: uses.filter((p) => p.district === d.id).length }));
  const rank = [...COINS].sort((a, b) => usesOf(b.symbol).length - usesOf(a.symbol).length).findIndex((c) => c.symbol === coin.symbol) + 1;
  const path = `/coin/${coin.symbol.toLowerCase()}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${coin.name}(${coin.symbol})로 할 수 있는 일`,
    numberOfItems: uses.length,
    itemListElement: uses.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.action, url: `${SITE_URL}/place/${p.id}` })),
  };

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-xs text-ink-3">
        <Link href="/coin">코인별 쓰임처</Link> <span className="mx-1">/</span> {coin.symbol}
      </nav>

      <h1 className="mt-3 text-[26px] font-extrabold leading-tight">
        <span className="mr-2 inline-block h-3 w-3 rounded-full align-middle" style={{ background: coin.color }} />
        {coin.name}({coin.symbol})로
        <br />
        할 수 있는 일 <span className="text-lime">{uses.length}가지</span>
      </h1>
      <p className="mt-2 text-sm">
        <LivePrice symbol={coin.symbol} />
      </p>

      <section className="mt-5">
        <h2 className="text-sm font-bold text-ink-2">{coin.name}, 뭐 하는 코인이에요?</h2>
        <p className="mt-1.5 text-[15px] leading-relaxed">{coin.about}</p>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-bold text-ink-2">그래서 실제로 쓸 수 있나요?</h2>
        <p className="mt-1.5 rounded-2xl bg-surface px-4 py-3.5 text-[15px] leading-relaxed">{coin.note}</p>
      </section>
      <p className="mt-2 text-xs text-ink-3">
        쓰임처 수 {COINS.length}개 코인 중 {rank}위 · 거래소와 지갑은 세지 않았어요
      </p>

      <section className="mt-6">
        <h2 className="text-sm font-bold text-ink-2">되는 것과 안 되는 것</h2>
        <ul className="mt-2 grid grid-cols-2 gap-1.5">
          {coverage.map(({ district, count }) => (
            <li key={district.id}>
              <a
                href={count > 0 ? `#${district.id}` : undefined}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm ${count > 0 ? "bg-surface font-bold" : "border border-dashed border-line text-ink-3"}`}
              >
                <span style={count > 0 ? { color: `hsl(${district.hue} 60% 75%)` } : undefined}>{district.name}</span>
                <span className={count > 0 ? "text-lime" : ""}>{count > 0 ? `${count}곳` : "아직 없음"}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {groups.map(({ district, places }) => (
        <section key={district.id} id={district.id} className="mt-8 scroll-mt-20">
          <h2 className="flex items-baseline gap-2 text-lg font-extrabold" style={{ color: `hsl(${district.hue} 60% 75%)` }}>
            {district.name}
            <span className="text-xs font-semibold text-ink-3">{district.tagline}</span>
          </h2>
          <ul className="mt-3 space-y-2">
            {places.map((p) => (
              <PlaceRow key={p.id} place={p} />
            ))}
          </ul>
        </section>
      ))}

      {uses.length === 0 && (
        <p className="mt-8 rounded-2xl bg-surface px-4 py-6 text-center text-sm text-ink-2">
          아직 확인된 쓰임처가 없어요. 찾으면 바로 지도에 올릴게요.
        </p>
      )}

      {starts.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-extrabold">먼저 필요한 것: 지갑</h2>
          <p className="mt-1 text-sm text-ink-2">거래소에 있는 {coin.symbol}는 아직 쓸 수 없어요. 내 지갑으로 꺼내는 것부터 시작합니다.</p>
          <ul className="mt-3 space-y-2">
            {starts.map((p) => (
              <PlaceRow key={p.id} place={p} />
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 flex gap-2">
        <Link href={`/app/map?coin=${coin.symbol}`} className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-lime text-sm font-bold text-lime-ink active:opacity-80">
          지도에서 {coin.symbol} 쓰임처 보기
        </Link>
        <ShareButton title={`${coin.name}로 할 수 있는 일 ${uses.length}가지`} text={`${coin.name}(${coin.symbol})로 할 수 있는 일 ${uses.length}가지. ${coin.note}`} path={path} />
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-bold text-ink-2">다른 코인은?</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {COINS.filter((c) => c.symbol !== coin.symbol).map((c) => (
            <Link key={c.symbol} href={`/coin/${c.symbol.toLowerCase()}`} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-2">
              {c.name} {usesOf(c.symbol).length}
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}

function PlaceRow({ place: p }: { place: Place }) {
  return (
    <li>
      <Link href={`/place/${p.id}`} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 active:opacity-80">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold">{p.action}</p>
          <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-ink-2">
            {p.name}
            <ShieldCheck size={12} className="shrink-0 text-lime" />
            <span className="truncate text-lime">{p.domain}</span>
          </p>
          <p className="mt-1 text-xs text-ink-3">
            {DIFFICULTY[p.difficulty]} · 약 {p.minutes}분 · {won(p.minKRW)}
          </p>
        </div>
        <ChevronRight size={18} className="shrink-0 text-ink-3" />
      </Link>
    </li>
  );
}
