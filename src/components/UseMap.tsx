"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import Link from "next/link";
import { Bookmark, LocateFixed, Search, X } from "lucide-react";
import {
  COINS,
  DISTRICTS,
  PLACES,
  PLACE_BY_ID,
  ROADS,
  TILE,
  WORLD,
  type CoinSymbol,
  type District,
  type Place,
} from "@/lib/data";
import { heldSymbols, useStore } from "@/lib/store";
import { PlaceSheet } from "./PlaceSheet";

type Filter = "all" | "mine" | CoinSymbol;

// 줌 단계: 멀리서는 블록 요약만 → 이름 타일 → 타일에 설명까지
const NAME_SCALE = 0.5; // 타일 이름(월드 20px)이 화면에서 10px 이상이 되는 배율
const DETAIL_SCALE = 0.85;
// 핀을 선택하면 적어도 타일 이름이 읽히는 배율로 맞춘다
const FOCUS_MIN_SCALE = 0.62;
// 검색·칩(위)과 하단 내비(아래)가 지도를 가리는 높이
const INSET = { top: 120, bottom: 96 };
const PEEK_SHEET = 300; // 요약 시트 높이를 아직 잴 수 없을 때의 추정치

// 타일 너비에 맞춰 이름을 자른다. 한글은 한 칸, 영문·숫자·공백은 0.58칸으로 센다.
function fitName(name: string, maxUnits: number) {
  let units = 0;
  for (let i = 0; i < name.length; i++) {
    units += /[\u3131-\uD79D]/.test(name[i]) ? 1 : 0.58;
    if (units > maxUnits) return `${name.slice(0, Math.max(i - 1, 1)).trimEnd()}…`;
  }
  return name;
}

function roadPath(a: Place, b: Place) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // 직선 대신 살짝 휜 길
  return `M${a.x} ${a.y} Q${mx - dy * 0.12} ${my + dx * 0.12} ${b.x} ${b.y}`;
}

export function UseMap({ initialPlaceId, initialFilter }: { initialPlaceId?: string; initialFilter?: Filter }) {
  const holdings = useStore((s) => s.holdings);
  const visited = useStore((s) => s.visited);
  const bookmarks = useStore((s) => s.bookmarks);
  const mine = useMemo(() => heldSymbols(holdings), [holdings]);

  const [filter, setFilter] = useState<Filter>(initialFilter ?? "all");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(initialPlaceId ?? null);
  const [detail, setDetail] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [query, setQuery] = useState("");
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const boxRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  const sheetRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fitScale = size
    ? Math.min(size.w / WORLD.width, Math.max(size.h - INSET.top - INSET.bottom, 200) / WORLD.height)
    : 0.45;
  const fitX = size ? (size.w - WORLD.width * fitScale) / 2 : 0;
  const fitY = size ? INSET.top + (size.h - INSET.top - INSET.bottom - WORLD.height * fitScale) / 2 : 0;

  const activeSymbols = useMemo<CoinSymbol[] | null>(
    () => (filter === "all" ? null : filter === "mine" ? mine : [filter]),
    [filter, mine],
  );

  const isReachable = useCallback(
    (p: Place) => {
      if (onlyBookmarks && !bookmarks.includes(p.id)) return false;
      if (!activeSymbols) return true;
      return p.coins.some((c) => activeSymbols.includes(c));
    },
    [activeSymbols, onlyBookmarks, bookmarks],
  );

  const reachableCount = PLACES.filter(isReachable).length;
  // 코인 필터 안내가 떠 있으면 그만큼 위쪽이 더 가려진다
  const topInset = INSET.top + (activeSymbols ? 36 : 0);

  // 선 굵기는 확대해도 화면상 두께가 유지되도록 역배율을 CSS 변수로 내려준다 (리렌더 없음)
  const applyScale = useCallback((scale: number) => {
    boxRef.current?.style.setProperty("--inv", String(1 / scale));
    setDetail(scale >= DETAIL_SCALE);
    setShowNames(scale >= NAME_SCALE);
  }, []);

  // 선택한 핀과 거기서 이어지는 핀들이 요약 시트 위쪽 영역에 한꺼번에 보이도록 맞춘다
  const focusPlace = useCallback(
    (p: Place) => {
      if (!size || !zoomRef.current) return;
      // '다음에 갈 곳'을 우선 화면에 담는다. 나가는 길이 없는 핀만 들어오는 길 기준으로 맞춘다.
      const outgoing = ROADS.filter(([from]) => from === p.id).map(([, to]) => PLACE_BY_ID[to]);
      const incoming = ROADS.filter(([, to]) => to === p.id).map(([from]) => PLACE_BY_ID[from]);
      const linked = outgoing.length > 0 ? outgoing : incoming;
      const pts = [p, ...linked];
      // 중심점이 아니라 타일 전체가 들어오도록 잡는다
      const minX = Math.min(...pts.map((q) => q.x - q.w / 2));
      const maxX = Math.max(...pts.map((q) => q.x + q.w / 2));
      const minY = Math.min(...pts.map((q) => q.y - TILE.h / 2));
      const maxY = Math.max(...pts.map((q) => q.y + TILE.h / 2));

      const sheetH = sheetRef.current?.offsetHeight ?? PEEK_SHEET;
      const area = { top: topInset + 16, bottom: size.h - sheetH - 16, left: 16, right: size.w - 16 };
      const scale = Math.min(
        1,
        Math.max(
          FOCUS_MIN_SCALE,
          Math.min((area.right - area.left) / Math.max(maxX - minX, 1), (area.bottom - area.top) / Math.max(maxY - minY, 1)),
        ),
      );
      let tx = (area.left + area.right) / 2 - ((minX + maxX) / 2) * scale;
      let ty = (area.top + area.bottom) / 2 - ((minY + maxY) / 2) * scale;
      // 이어진 곳을 다 담지 못해도 선택한 타일만큼은 보이는 영역 안에 통째로 둔다
      tx += Math.min(0, area.right - ((p.x + p.w / 2) * scale + tx)) + Math.max(0, area.left - ((p.x - p.w / 2) * scale + tx));
      ty += Math.min(0, area.bottom - ((p.y + TILE.h / 2) * scale + ty)) + Math.max(0, area.top - ((p.y - TILE.h / 2) * scale + ty));
      zoomRef.current.setTransform(tx, ty, scale, 350);
    },
    [size, topInset],
  );

  const focusDistrict = (d: District) => {
    if (!size || !zoomRef.current) return;
    const availH = size.h - topInset - INSET.bottom;
    // 블록이 화면보다 커지더라도 타일 이름이 읽히는 배율까지는 확대한다
    const scale = Math.max(NAME_SCALE + 0.06, Math.min(1.1, (size.w - 24) / d.w, availH / d.h));
    // 블록이 화면보다 길면 위쪽(이름)부터 보여준다
    const ty = d.h * scale > availH ? topInset + 12 - d.y * scale : topInset + (availH - d.h * scale) / 2 - d.y * scale;
    zoomRef.current.setTransform(size.w / 2 - (d.x + d.w / 2) * scale, ty, scale, 350);
  };

  const resetView = () => {
    if (!size || !zoomRef.current) return;
    zoomRef.current.setTransform(fitX, fitY, fitScale, 350);
  };

  // 시트가 그려진 뒤에 높이를 재서 맞춘다
  useEffect(() => {
    if (!size) return;
    const t = setTimeout(() => {
      if (selectedId && PLACE_BY_ID[selectedId]) focusPlace(PLACE_BY_ID[selectedId]);
    }, 30);
    return () => clearTimeout(t);
  }, [selectedId, size, focusPlace]);

  // 화면 크기가 바뀌면 전체 지도를 다시 맞춘다
  const selectedRef = useRef(selectedId);
  useEffect(() => {
    selectedRef.current = selectedId;
  }, [selectedId]);
  useEffect(() => {
    if (!size || selectedRef.current) return;
    zoomRef.current?.setTransform(fitX, fitY, fitScale, 0);
  }, [size, fitX, fitY, fitScale]);

  const select = (p: Place) => {
    setSelectedId(p.id);
    setQuery("");
  };

  const results = query.trim()
    ? PLACES.filter((p) =>
        `${p.name} ${p.domain} ${p.action}`.toLowerCase().includes(query.trim().toLowerCase()),
      ).slice(0, 6)
    : [];

  const selected = selectedId ? PLACE_BY_ID[selectedId] : null;
  const nextIds = useMemo(
    () => new Set(ROADS.filter(([from]) => from === selectedId).map(([, to]) => to)),
    [selectedId],
  );

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_50%_34%,#101922_0%,#080c11_52%,#06080b_100%)]" style={{ ["--inv" as string]: 1 / fitScale }}>
      {size && (
        <TransformWrapper
          ref={zoomRef}
          initialScale={fitScale}
          minScale={fitScale * 0.85}
          maxScale={3}
          initialPositionX={fitX}
          initialPositionY={fitY}
          limitToBounds={false}
          doubleClick={{ mode: "zoomIn", step: 0.6 }}
          wheel={{ step: 0.12 }}
          onInit={(ref) => applyScale(ref.state.scale)}
          onTransform={(_, state) => applyScale(state.scale)}
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: WORLD.width, height: WORLD.height }}
          >
            <svg
              width={WORLD.width}
              height={WORLD.height}
              viewBox={`0 0 ${WORLD.width} ${WORLD.height}`}
              role="img"
              aria-label="코인 쓰임처 지도"
              style={{ overflow: "visible" }}
            >
              <defs>
                <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.25" fill="#25313a" />
                </pattern>
              </defs>
              <rect x={-2000} y={-2000} width={WORLD.width + 4000} height={WORLD.height + 4000} fill="url(#dots)" />

              {/* 구역 = 블록. 멀리서는 이름·개수·진행 막대만 보여준다 */}
              {DISTRICTS.map((d) => {
                const inDistrict = PLACES.filter((p) => p.district === d.id);
                const lit = inDistrict.filter(isReachable).length;
                const ratio = activeSymbols || onlyBookmarks ? lit / inDistrict.length : 1;
                return (
                  <g key={d.id} onClick={() => !showNames && focusDistrict(d)} style={{ cursor: showNames ? undefined : "zoom-in" }}>
                    <rect
                      x={d.x}
                      y={d.y}
                      width={d.w}
                      height={d.h}
                      rx={28}
                      fill={`hsl(${d.hue} 22% ${showNames ? 10 : 9 + ratio * 4}%)`}
                      stroke={`hsl(${d.hue} 34% 26%)`}
                      style={{ strokeWidth: "calc(1.5px * var(--inv))" }}
                    />
                    {showNames ? (
                      <>
                        <text x={d.x + 26} y={d.y + 50} fontSize={30} fontWeight={800} fill={`hsl(${d.hue} 44% 73%)`}>
                          {d.name}
                        </text>
                        <text x={d.x + d.w - 26} y={d.y + 48} textAnchor="end" fontSize={17} fill={`hsl(${d.hue} 35% 58%)`}>
                          {detail ? d.tagline : `${activeSymbols ? `${lit} / ` : ""}${inDistrict.length}곳`}
                        </text>
                      </>
                    ) : (
                      <>
                        <text x={d.x + d.w / 2} y={d.y + d.h / 2 - 8} textAnchor="middle" fontSize={54} fontWeight={800} fill={`hsl(${d.hue} 44% 74%)`}>
                          {d.name}
                        </text>
                        <text x={d.x + d.w / 2} y={d.y + d.h / 2 + 40} textAnchor="middle" fontSize={32} fontWeight={600} fill={`hsl(${d.hue} 35% 60%)`}>
                          {activeSymbols || onlyBookmarks ? `${lit} / ${inDistrict.length}곳` : `${inDistrict.length}곳`}
                        </text>
                        <rect x={d.x + d.w * 0.2} y={d.y + d.h / 2 + 62} width={d.w * 0.6} height={10} rx={5} fill={`hsl(${d.hue} 30% 18%)`} />
                        <rect
                          x={d.x + d.w * 0.2}
                          y={d.y + d.h / 2 + 62}
                          width={d.w * 0.6 * ratio}
                          height={10}
                          rx={5}
                          fill={activeSymbols || onlyBookmarks ? "var(--color-lime)" : `hsl(${d.hue} 45% 45%)`}
                        />
                      </>
                    )}
                  </g>
                );
              })}

              {/* 길은 선택한 곳에 이어진 것만, 타일 아래에 깔아 글자를 가리지 않게 한다. 내가 걸어온 길(양쪽 다 해봄)은 발자취로 남긴다 */}
              {ROADS.map(([from, to]) => {
                const outgoing = from === selectedId;
                const incoming = to === selectedId;
                const walked = Boolean(visited[from] && visited[to]);
                if (!outgoing && !incoming && !walked) return null;
                return (
                  <path
                    key={`${from}-${to}`}
                    d={roadPath(PLACE_BY_ID[from], PLACE_BY_ID[to])}
                    fill="none"
                    pointerEvents="none"
                    stroke={outgoing || walked ? "var(--color-lime)" : "#8b8b96"}
                    strokeLinecap="round"
                    opacity={outgoing ? 0.85 : walked ? 0.35 : 0.5}
                    style={{
                      strokeWidth: `calc(${outgoing ? 2.5 : 2}px * var(--inv))`,
                      strokeDasharray: incoming ? "calc(6px * var(--inv)) calc(7px * var(--inv))" : undefined,
                    }}
                  />
                );
              })}
              {/* 쓰임처 = 이름 타일. 멀리서는 선택한 곳과 다음 갈 곳만 그린다 */}
              {PLACES.map((p) => {
                const isSelected = p.id === selectedId;
                const isNext = nextIds.has(p.id);
                if (!showNames && !isSelected && !isNext) return null;
                const reachable = isReachable(p);
                const isVisited = Boolean(visited[p.id]);
                const highlighted = isSelected || isNext || (reachable && Boolean(activeSymbols));
                return (
                  <g
                    key={p.id}
                    transform={`translate(${p.x - p.w / 2} ${p.y - TILE.h / 2})`}
                    opacity={reachable || isSelected || isNext ? 1 : 0.28}
                    onClick={() => select(p)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name}: ${p.action}`}
                    onKeyDown={(e) => e.key === "Enter" && select(p)}
                    style={{ cursor: "pointer", outline: "none" }}
                  >
                    <rect
                      width={p.w}
                      height={TILE.h}
                      rx={16}
                      fill={isSelected ? "var(--color-lime)" : isVisited ? "#11231f" : "#121a21"}
                      stroke={highlighted ? "var(--color-lime)" : "#30303a"}
                      style={{ strokeWidth: `calc(${isSelected || isNext ? 2 : 1.2}px * var(--inv))` }}
                    />
                    {isVisited ? (
                      <path
                        d="M14 0 18.5 4.5 27 -4.5"
                        transform={`translate(0 ${detail ? 24 : TILE.h / 2})`}
                        fill="none"
                        stroke={isSelected ? "#1a2400" : "var(--color-lime)"}
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <rect
                        x={15}
                        y={(detail ? 24 : TILE.h / 2) - 5}
                        width={10}
                        height={10}
                        rx={3}
                        fill={isSelected ? "#1a2400" : highlighted ? "var(--color-lime)" : "#5b5b66"}
                      />
                    )}
                    <text x={34} y={(detail ? 24 : TILE.h / 2) + 6} fontSize={17} fontWeight={700} fill={isSelected ? "#1a2400" : "#f4f4f5"}>
                      {fitName(p.name, (p.w - 44) / 17)}
                    </text>
                    {detail && (
                      <text x={16} y={50} fontSize={12.5} fill={isSelected ? "#3b4a12" : "#9a9aa6"}>
                        {fitName(p.action, (p.w - 28) / 12.5)}
                      </text>
                    )}
                    {bookmarks.includes(p.id) && <rect x={p.w - 22} y={10} width={10} height={10} rx={3} fill="#ffd35c" />}
                  </g>
                );
              })}

            </svg>
          </TransformComponent>
        </TransformWrapper>
      )}

      {/* 상단 검색 + 코인 필터 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 space-y-2.5 p-4">
        <div className="pointer-events-auto relative">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-ink-2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="하고 싶은 일이나 서비스를 검색하세요"
            aria-label="쓰임처 검색"
            className="glass-panel h-12 w-full rounded-2xl pl-11 pr-10 text-[15px] text-ink placeholder:text-ink-3 outline-none focus:border-lime/60"
          />
          {query && (
            <button type="button" aria-label="검색어 지우기" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-2">
              <X size={16} />
            </button>
          )}
          {query.trim() && (
            <ul className="glass-panel absolute inset-x-0 top-14 overflow-hidden rounded-2xl">
              {results.length === 0 && <li className="px-4 py-3 text-sm text-ink-3">아직 지도에 없는 곳이에요</li>}
              {results.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => select(p)} className="flex w-full items-baseline gap-2 px-4 py-3 text-left active:bg-surface-2">
                    <span className="text-sm font-semibold">{p.name}</span>
                    <span className="truncate text-xs text-ink-2">{p.action}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="no-scrollbar pointer-events-auto -mx-4 flex gap-2 overflow-x-auto px-4">
          <Chip active={filter === "all"} onClick={() => setFilter("all")}>전체</Chip>
          {(mine.length > 0 || filter === "mine") && (
            <Chip active={filter === "mine"} onClick={() => setFilter("mine")}>내 코인</Chip>
          )}
          {[...COINS].sort((a, b) => Number(mine.includes(b.symbol)) - Number(mine.includes(a.symbol))).map((c) => (
            <Chip key={c.symbol} active={filter === c.symbol} onClick={() => setFilter(filter === c.symbol ? "all" : c.symbol)}>
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: c.color }} />
              {c.symbol}
            </Chip>
          ))}
        </div>

        {activeSymbols && (
          <div className="pointer-events-auto flex items-center gap-1.5">
            <p className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-lime-ink">
              {filter === "mine" ? "내 코인" : filter}
              {activeSymbols.length === 0 ? " — 보유 코인을 MY에서 등록하세요" : `으로 갈 수 있는 곳 ${reachableCount} / ${PLACES.length}`}
            </p>
            {filter !== "mine" && filter !== "all" && (
              <Link href={`/coin/${filter.toLowerCase()}`} className="rounded-full border border-lime/50 bg-surface/90 px-3 py-1 text-xs font-bold text-lime backdrop-blur">
                {filter} 자세히
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="absolute right-4 top-[132px] z-10 flex flex-col gap-2.5">
        <RoundButton label="북마크만 보기" active={onlyBookmarks} onClick={() => setOnlyBookmarks((v) => !v)}>
          <Bookmark size={20} fill={onlyBookmarks ? "currentColor" : "none"} />
        </RoundButton>
        <RoundButton label="전체 지도로" onClick={resetView}>
          <LocateFixed size={20} />
        </RoundButton>
      </div>

      {selected && <PlaceSheet key={selected.id} sheetRef={sheetRef} place={selected} onClose={() => setSelectedId(null)} onGo={(id) => select(PLACE_BY_ID[id])} />}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold backdrop-blur-xl ${
        active ? "border-lime/60 bg-lime text-lime-ink" : "border-white/[0.08] bg-[#0d141b]/88 text-ink-2"
      }`}
    >
      {children}
    </button>
  );
}

function RoundButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl ${
        active ? "border-lime/50 bg-lime text-lime-ink" : "border-white/[0.08] bg-[#0d141b]/88 text-ink"
      }`}
    >
      {children}
    </button>
  );
}
