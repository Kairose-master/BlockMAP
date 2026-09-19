import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ExternalLink, ShieldCheck, Signal, Wallet } from "lucide-react";
import { LiveAmount } from "@/components/LivePrice";
import { PublicShell } from "@/components/PublicShell";
import { ShareButton } from "@/components/ShareButton";
import { COIN_BY_SYMBOL, DISTRICT_BY_ID, PLACES, PLACE_BY_ID, ROADS } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const DIFFICULTY = { 1: "쉬움", 2: "보통", 3: "어려움" } as const;

export function generateStaticParams() {
  return PLACES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/place/[id]">): Promise<Metadata> {
  const { id } = await params;
  const place = PLACE_BY_ID[id];
  if (!place) return {};
  return {
    title: `${place.action} — ${place.name} 공식 사이트(${place.domain})와 방법`,
    description: `${place.desc} 필요한 코인: ${place.coins.slice(0, 6).join(", ")}${place.coins.length > 6 ? " 등" : ""}. 약 ${place.minutes}분.`,
    alternates: { canonical: `/place/${place.id}` },
  };
}

export default async function PlacePage({ params }: PageProps<"/place/[id]">) {
  const { id } = await params;
  const place = PLACE_BY_ID[id];
  if (!place) notFound();

  const district = DISTRICT_BY_ID[place.district];
  const next = ROADS.filter(([from]) => from === place.id).map(([, to]) => PLACE_BY_ID[to]);
  const before = ROADS.filter(([, to]) => to === place.id).map(([from]) => PLACE_BY_ID[from]);
  const shownCoins = place.coins.slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: place.action,
    description: place.desc,
    totalTime: `PT${place.minutes}M`,
    step: place.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
    url: `${SITE_URL}/place/${place.id}`,
  };

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <span
        className="inline-block rounded-full px-2.5 py-1 text-[11px] font-bold"
        style={{ background: `hsl(${district.hue} 35% 16%)`, color: `hsl(${district.hue} 60% 75%)` }}
      >
        {district.name}
      </span>
      <h1 className="mt-2 text-[26px] font-extrabold leading-tight">{place.action}</h1>
      <p className="mt-1 text-sm text-ink-2">{place.name}</p>

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-lime/30 bg-lime/10 px-3.5 py-3">
        <ShieldCheck size={18} className="shrink-0 text-lime" />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-lime">{place.domain}</p>
          <p className="text-[11px] text-ink-2">검증된 공식 주소 · 검색 광고에 뜨는 비슷한 가짜 사이트에 주의하세요</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat icon={<Signal size={14} />} label="난이도" value={DIFFICULTY[place.difficulty]} />
        <Stat icon={<Clock size={14} />} label="소요 시간" value={`약 ${place.minutes}분`} />
        <Stat icon={<Wallet size={14} />} label="최소 금액" value={place.minKRW === 0 ? "무료" : `${place.minKRW.toLocaleString("ko-KR")}원`}>
          <LiveAmount symbol={place.coins[0]} krw={place.minKRW} />
        </Stat>
      </dl>

      <p className="mt-5 text-[15px] leading-relaxed">{place.desc}</p>

      <section className="mt-7">
        <h2 className="text-sm font-bold text-ink-2">이 코인이 있으면 돼요</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {shownCoins.map((c) => (
            <Link key={c} href={`/coin/${c.toLowerCase()}`} className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-ink-2">
              <span className="h-2 w-2 rounded-full" style={{ background: COIN_BY_SYMBOL[c].color }} />
              {COIN_BY_SYMBOL[c].name}
            </Link>
          ))}
          {place.coins.length > shownCoins.length && <span className="px-1 py-1 text-xs text-ink-3">외 {place.coins.length - shownCoins.length}종</span>}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-sm font-bold text-ink-2">이렇게 해요</h2>
        <ol className="mt-2 space-y-2">
          {place.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-[15px]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-lime">{i + 1}</span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {before.length > 0 && (
        <section className="mt-7">
          <h2 className="text-sm font-bold text-ink-2">이것부터 하고 오세요</h2>
          <LinkChips places={before} />
        </section>
      )}
      {next.length > 0 && (
        <section className="mt-7">
          <h2 className="text-sm font-bold text-ink-2">다음에 해볼 만한 것</h2>
          <LinkChips places={next} />
        </section>
      )}

      {place.reviews.length > 0 && (
        <section className="mt-7">
          <h2 className="text-sm font-bold text-ink-2">이런 후기가 쌓여요</h2>
          <ul className="mt-2 space-y-2">
            {place.reviews.map((rv) => (
              <li key={rv.id} className="rounded-2xl bg-surface px-3.5 py-3">
                <p className="text-[15px] leading-relaxed">{rv.body}</p>
                <p className="mt-1.5 text-xs text-ink-3">
                  {rv.sample && <span className="mr-1.5 rounded bg-line px-1.5 py-0.5 text-[10px] font-bold text-ink-2">예시</span>}
                  {rv.author}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 space-y-2">
        <a href={place.url} target="_blank" rel="noopener noreferrer" className="flex h-13 w-full items-center justify-center gap-1.5 rounded-2xl bg-lime text-[15px] font-bold text-lime-ink active:opacity-80">
          공식 사이트 열기 ({place.domain})
          <ExternalLink size={16} />
        </a>
        <div className="flex gap-2">
          <Link href={`/app/map?place=${place.id}`} className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-line text-sm font-bold active:opacity-70">
            지도에서 보기 · 해봤어요 남기기
          </Link>
          <ShareButton title={place.action} text={`${place.action} — ${place.name} (${place.domain})`} path={`/place/${place.id}`} />
        </div>
      </div>
    </PublicShell>
  );
}

function Stat({ icon, label, value, children }: { icon: React.ReactNode; label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-surface px-2 py-3">
      <dt className="flex items-center justify-center gap-1 text-[11px] text-ink-3">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 text-[15px] font-bold">{value}</dd>
      {children && <dd className="text-[11px]">{children}</dd>}
    </div>
  );
}

function LinkChips({ places }: { places: (typeof PLACES)[number][] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {places.map((p) => (
        <Link key={p.id} href={`/place/${p.id}`} className="rounded-2xl bg-surface px-3.5 py-2.5 active:opacity-70">
          <p className="text-sm font-semibold">{p.action}</p>
          <p className="text-xs text-ink-3">{p.name}</p>
        </Link>
      ))}
    </div>
  );
}
