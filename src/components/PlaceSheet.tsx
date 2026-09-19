"use client";

import { useState } from "react";
import { Bookmark, Check, ChevronDown, ChevronUp, Clock, ExternalLink, MapPinned, ShieldCheck, Signal, Wallet, X } from "lucide-react";
import { COIN_BY_SYMBOL, DISTRICT_BY_ID, PLACE_BY_ID, ROADS, type Place } from "@/lib/data";
import { heldSymbols, useStore } from "@/lib/store";
import { formatCoinAmount, formatKRW, usePrices } from "@/lib/usePrices";

const DIFFICULTY = { 1: "쉬움", 2: "보통", 3: "어려움" } as const;

type Props = {
  place: Place;
  onClose: () => void;
  onGo: (placeId: string) => void;
  sheetRef?: React.Ref<HTMLElement>;
};

export function PlaceSheet({ place, onClose, onGo, sheetRef }: Props) {
  const prices = usePrices();
  const holdings = useStore((s) => s.holdings);
  const isVisited = useStore((s) => Boolean(s.visited[place.id]));
  const isBookmarked = useStore((s) => s.bookmarks.includes(place.id));
  const myReviews = useStore((s) => s.myReviews[place.id]);
  const toggleVisited = useStore((s) => s.toggleVisited);
  const toggleBookmark = useStore((s) => s.toggleBookmark);
  // 처음엔 요약만 보여 지도 위의 길이 가려지지 않게 한다
  const [expanded, setExpanded] = useState(false);

  const district = DISTRICT_BY_ID[place.district];
  const mine = heldSymbols(holdings);
  // 최소 금액을 환산해 보여줄 코인: 내가 가진 코인 우선
  const payCoin = place.coins.find((c) => mine.includes(c)) ?? place.coins[0];
  const payPrice = prices[payCoin]?.price;
  const canGo = mine.length === 0 ? null : place.coins.some((c) => mine.includes(c));
  const nextIds = ROADS.filter(([from]) => from === place.id).map(([, to]) => to);
  const reviews = [...(myReviews ?? []), ...place.reviews];
  const realCount = reviews.filter((rv) => !rv.sample).length; // 예시 후기는 개수에 세지 않는다

  return (
    <section
      ref={sheetRef}
      aria-label={`${place.name} 상세`}
      className={`sheet-up absolute inset-x-0 bottom-0 z-40 flex flex-col rounded-t-[30px] border-t border-white/10 bg-[#0d141b]/96 shadow-[0_-24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl ${expanded ? "max-h-[78%]" : ""}`}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-label={expanded ? "요약으로 접기" : "자세히 보기"}
        onClick={() => setExpanded((v) => !v)}
        className="flex h-6 w-full shrink-0 items-end justify-center"
      >
        <span className="h-1 w-10 rounded-full bg-line" />
      </button>
      <div className="flex items-start justify-between gap-3 px-5 pt-2">
        <div className="min-w-0">
          <h2 className="text-[21px] font-extrabold leading-tight">{place.action}</h2>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-2">
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-bold"
              style={{ background: `hsl(${district.hue} 35% 16%)`, color: `hsl(${district.hue} 60% 75%)` }}
            >
              {district.name}
            </span>
            {place.name}
            <span className="flex items-center gap-1 font-semibold text-lime">
              <ShieldCheck size={14} />
              {place.domain}
            </span>
          </p>
        </div>
        <button type="button" aria-label="닫기" onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink-2">
          <X size={18} />
        </button>
      </div>

      <div className="no-scrollbar mt-3 flex-1 space-y-3 overflow-y-auto px-5 pb-3">
        {expanded && (
        <div className="flex items-center gap-2 rounded-2xl border border-lime/30 bg-lime/10 px-3.5 py-3">
          <ShieldCheck size={18} className="shrink-0 text-lime" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-lime">{place.domain}</p>
            <p className="text-[11px] text-ink-2">검증된 공식 주소 · 비슷한 가짜 사이트에 주의하세요</p>
          </div>
        </div>
        )}

        {canGo !== null && (expanded || !canGo) && (
          <p className={`flex items-center gap-2 text-sm font-semibold ${canGo ? "text-lime" : "text-ink-2"}`}>
            <Wallet size={16} />
            {canGo ? "내 코인으로 바로 해볼 수 있어요" : `내 코인으로는 못 가요 · ${place.coins.join(", ")} 필요`}
          </p>
        )}

        <dl className="grid grid-cols-3 gap-2 text-center">
          <Stat icon={<Signal size={14} />} label="난이도" value={DIFFICULTY[place.difficulty]} />
          <Stat icon={<Clock size={14} />} label="소요 시간" value={`약 ${place.minutes}분`} />
          <Stat
            icon={<Wallet size={14} />}
            label="최소 금액"
            value={place.minKRW === 0 ? "무료" : formatKRW(place.minKRW)}
            sub={place.minKRW > 0 && payPrice ? `≈ ${formatCoinAmount(place.minKRW / payPrice)} ${payCoin}` : undefined}
          />
        </dl>

        {!expanded && nextIds.length > 0 && (
          <div className="no-scrollbar -mx-5 flex items-center gap-1.5 overflow-x-auto px-5">
            <span className="shrink-0 text-xs font-bold text-ink-3">다음</span>
            {nextIds.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onGo(id)}
                className="shrink-0 rounded-full border border-lime/40 px-2.5 py-1 text-xs font-semibold text-lime active:opacity-70"
              >
                {PLACE_BY_ID[id].name}
              </button>
            ))}
          </div>
        )}

        {!expanded && (
          <button type="button" onClick={() => setExpanded(true)} className="flex w-full items-center justify-center gap-1 text-sm font-semibold text-ink-2">
            따라하기 · 후기 {realCount > 0 && realCount}
            <ChevronUp size={16} />
          </button>
        )}

        {expanded && (
        <div className="space-y-5 pt-1">
        <p className="text-[15px] leading-relaxed text-ink">{place.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {place.coins.map((c) => (
            <span key={c} className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${mine.includes(c) ? "border-lime text-lime" : "border-line text-ink-2"}`}>
              <span className="h-2 w-2 rounded-full" style={{ background: COIN_BY_SYMBOL[c].color }} />
              {c}
            </span>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-bold text-ink-2">이렇게 해요</h3>
          <ol className="mt-2 space-y-2">
            {place.steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-[15px]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-lime">{i + 1}</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {place.offline && (
          <p className="flex items-center gap-2 rounded-2xl bg-surface-2 px-3.5 py-3 text-sm text-ink-2">
            <MapPinned size={16} className="shrink-0" />
            오프라인 장소가 있는 쓰임처예요. 실제 지도 보기는 준비 중입니다.
          </p>
        )}

        {nextIds.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-ink-2">여기서 이어지는 길</h3>
            <div className="no-scrollbar -mx-5 mt-2 flex gap-2 overflow-x-auto px-5">
              {nextIds.map((id) => (
                <button key={id} type="button" onClick={() => onGo(id)} className="shrink-0 rounded-2xl bg-surface-2 px-3.5 py-2.5 text-left active:opacity-70">
                  <p className="text-sm font-semibold">{PLACE_BY_ID[id].action}</p>
                  <p className="text-xs text-ink-3">{PLACE_BY_ID[id].name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold text-ink-2">해본 사람들 {realCount > 0 && <span className="text-lime">{realCount}</span>}</h3>
          <ul className="mt-2 space-y-2">
            {reviews.length === 0 && <li className="rounded-2xl bg-surface-2 px-3.5 py-4 text-center text-sm text-ink-3">아직 후기가 없어요. 첫 발자국을 남겨주세요.</li>}
            {reviews.map((rv) => (
              <li key={rv.id} className="rounded-2xl bg-surface-2 px-3.5 py-3">
                <p className="text-[15px] leading-relaxed">{rv.body}</p>
                <p className="mt-1.5 text-xs text-ink-3">
                  {rv.sample && <span className="mr-1.5 rounded bg-line px-1.5 py-0.5 text-[10px] font-bold text-ink-2">예시</span>}
                  {rv.author}
                  {rv.mine && " (나)"}
                  {rv.costKRW !== undefined && ` · 든 돈 ${formatKRW(rv.costKRW)}`}
                  {rv.minutes !== undefined && ` · ${rv.minutes}분`}
                </p>
              </li>
            ))}
          </ul>
          <ReviewForm placeId={place.id} />
        </div>

        <button type="button" onClick={() => setExpanded(false)} className="flex w-full items-center justify-center gap-1 text-sm font-semibold text-ink-3">
          접고 지도 보기
          <ChevronDown size={16} />
        </button>
        </div>
        )}
      </div>

      <div className="flex gap-2 border-t border-line px-5 pb-5 pt-3">
        <button
          type="button"
          aria-label="북마크"
          aria-pressed={isBookmarked}
          onClick={() => toggleBookmark(place.id)}
          className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border ${isBookmarked ? "border-[#ffd35c] text-[#ffd35c]" : "border-line text-ink-2"}`}
        >
          <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          aria-pressed={isVisited}
          onClick={() => toggleVisited(place.id)}
          className={`flex h-13 flex-1 items-center justify-center gap-1.5 rounded-2xl border text-[15px] font-bold ${isVisited ? "border-lime bg-lime/15 text-lime" : "border-line text-ink"}`}
        >
          <Check size={18} />
          {isVisited ? "해봤어요!" : "해봤어요"}
        </button>
        <a
          href={place.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-13 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-lime text-[15px] font-bold text-lime-ink active:opacity-80"
        >
          공식 사이트
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 px-2 py-2.5">
      <dt className="flex items-center justify-center gap-1 text-[11px] text-ink-3">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 text-[15px] font-bold">{value}</dd>
      {sub && <dd className="text-[11px] text-ink-2">{sub}</dd>}
    </div>
  );
}

function ReviewForm({ placeId }: { placeId: string }) {
  const addReview = useStore((s) => s.addReview);
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [cost, setCost] = useState("");
  const [minutes, setMinutes] = useState("");
  const [error, setError] = useState("");

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-2 h-11 w-full rounded-2xl border border-dashed border-line text-sm font-semibold text-ink-2">
        + 해본 후기 남기기
      </button>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (body.trim().length < 5) {
      setError("5자 이상 적어주세요");
      return;
    }
    addReview(placeId, {
      body: body.trim(),
      costKRW: cost ? Number(cost) : undefined,
      minutes: minutes ? Number(minutes) : undefined,
    });
    setBody("");
    setCost("");
    setMinutes("");
    setOpen(false);
  };

  return (
    <form onSubmit={submit} className="mt-2 space-y-2 rounded-2xl border border-line p-3">
      <textarea
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          setError("");
        }}
        rows={3}
        placeholder="얼마 들었고, 얼마나 걸렸고, 뭐가 헷갈렸나요?"
        aria-label="후기 내용"
        className="w-full resize-none rounded-xl bg-surface-2 p-3 text-[15px] outline-none placeholder:text-ink-3 focus:ring-1 focus:ring-lime"
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex gap-2">
        <input value={cost} onChange={(e) => setCost(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="든 돈 (원)" aria-label="든 돈" className="h-10 min-w-0 flex-1 rounded-xl bg-surface-2 px-3 text-sm outline-none placeholder:text-ink-3" />
        <input value={minutes} onChange={(e) => setMinutes(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="걸린 시간 (분)" aria-label="걸린 시간" className="h-10 min-w-0 flex-1 rounded-xl bg-surface-2 px-3 text-sm outline-none placeholder:text-ink-3" />
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setOpen(false)} className="h-10 flex-1 rounded-xl bg-surface-2 text-sm font-semibold text-ink-2">취소</button>
        <button type="submit" className="h-10 flex-1 rounded-xl bg-lime text-sm font-bold text-lime-ink">등록</button>
      </div>
    </form>
  );
}
