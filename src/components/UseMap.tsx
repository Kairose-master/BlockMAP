"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownLeft, ArrowLeft, ArrowRight, Bookmark, Check, ChevronDown, ChevronUp, Compass, Grid2X2, LocateFixed, Minus, MousePointer2, Plus, Search, X } from "lucide-react";
import { CITY_DISTRICTS } from "@/lib/city-layout";
import { COINS, DISTRICT_BY_ID, PLACES, PLACE_BY_ID, type CoinSymbol, type DistrictId, type Place } from "@/lib/data";
import { heldSymbols, useStore } from "@/lib/store";
import { PlaceSheet } from "./PlaceSheet";
import "./map-explorer.css";

const CityScene = dynamic(() => import("./CityScene"), {
  ssr: false,
  loading: () => <div className="map-loading" role="status"><span />도시를 펼치는 중</div>,
});

type Filter = "all" | "mine" | CoinSymbol;

function validFilter(value?: string): Filter {
  return value === "mine" || COINS.some((coin) => coin.symbol === value) ? value as Filter : "all";
}

function updateMapUrl(next: { filter?: Filter; place?: string | null }) {
  const url = new URL(window.location.href);
  if (next.filter !== undefined) {
    url.searchParams.delete("coin");
    url.searchParams.delete("filter");
    if (next.filter === "mine") url.searchParams.set("filter", "mine");
    else if (next.filter !== "all") url.searchParams.set("coin", next.filter);
  }
  if (next.place !== undefined) {
    if (next.place) url.searchParams.set("place", next.place);
    else url.searchParams.delete("place");
  }
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

export function UseMap({ initialPlaceId, initialFilter }: { initialPlaceId?: string; initialFilter?: Filter }) {
  const initialPlace = initialPlaceId ? PLACE_BY_ID[initialPlaceId] : undefined;
  const holdings = useStore((state) => state.holdings);
  const bookmarks = useStore((state) => state.bookmarks);
  const visited = useStore((state) => state.visited);
  const mine = useMemo(() => heldSymbols(holdings), [holdings]);
  const [filter, setFilter] = useState<Filter>(() => validFilter(initialFilter));
  const [query, setQuery] = useState("");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState<DistrictId | null>(initialPlace?.district ?? null);
  const [selectedId, setSelectedId] = useState<string | null>(initialPlace?.id ?? null);
  const [showServices, setShowServices] = useState(Boolean(initialPlace));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<"perspective" | "top">("perspective");
  const [zoomCommand, setZoomCommand] = useState<{ direction: 1 | -1; id: number } | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const mobileBrowseRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const queryText = query.trim().toLocaleLowerCase();
  const selected = selectedId ? PLACE_BY_ID[selectedId] : undefined;

  const filteredPlaces = useMemo(() => {
    const symbols = filter === "all" ? null : filter === "mine" ? mine : [filter];
    return PLACES.filter((place) => {
      if (onlyBookmarks && !bookmarks.includes(place.id)) return false;
      if (symbols && !place.coins.some((coin) => symbols.includes(coin))) return false;
      return !queryText || `${place.name} ${place.action} ${place.domain} ${DISTRICT_BY_ID[place.district].name}`.toLocaleLowerCase().includes(queryText);
    });
  }, [filter, mine, onlyBookmarks, bookmarks, queryText]);

  const counts = useMemo(() => Object.fromEntries(
    CITY_DISTRICTS.map((district) => [district.id, filteredPlaces.filter((place) => place.district === district.id).length]),
  ) as Record<DistrictId, number>, [filteredPlaces]);

  const visiblePlaces = useMemo(
    () => activeDistrict ? filteredPlaces.filter((place) => place.district === activeDistrict) : filteredPlaces,
    [filteredPlaces, activeDistrict],
  );
  const district = activeDistrict ? DISTRICT_BY_ID[activeDistrict] : null;
  const browsingServices = showServices || Boolean(queryText) || onlyBookmarks;
  const resultsTitle = queryText ? "검색 결과" : district?.name ?? (onlyBookmarks ? "저장한 서비스" : "모든 서비스");

  const selectDistrict = useCallback((id: DistrictId) => {
    setSelectedId(null);
    updateMapUrl({ place: null });
    setActiveDistrict(id);
    setShowServices(true);
    setDrawerOpen(true);
    servicesRef.current?.scrollTo({ top: 0 });
  }, []);

  const selectPlace = useCallback((place: Place) => {
    setQuery("");
    setShowServices(true);
    setSelectedId(place.id);
    setActiveDistrict(place.district);
    updateMapUrl({ place: place.id });
  }, []);

  const closePlace = useCallback(() => {
    setSelectedId(null);
    updateMapUrl({ place: null });
  }, []);

  useEffect(() => {
    const browse = mobileBrowseRef.current;
    const root = rootRef.current;
    if (!browse || !root) return;
    const measure = () => root.style.setProperty("--map-mobile-bottom", `${browse.offsetHeight + 91}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(browse);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (selectedId) closePlace();
      else setDrawerOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId, closePlace]);

  function changeFilter(value: string) {
    const next = validFilter(value);
    setFilter(next);
    updateMapUrl({ filter: next });
  }

  function resetView() {
    closePlace();
    setActiveDistrict(null);
    setResetKey((key) => key + 1);
    setShowServices(false);
    setDrawerOpen(false);
  }

  function clearFilters() {
    setQuery("");
    setOnlyBookmarks(false);
    changeFilter("all");
  }

  function browseAll() {
    closePlace();
    setActiveDistrict(null);
    setShowServices(true);
    setDrawerOpen(true);
  }

  const serviceList = (mobile = false) => (
    <div className="map-services" ref={mobile ? undefined : servicesRef}>
      {visiblePlaces.length === 0 ? (
        <div className="map-empty">
          <Search size={24} strokeWidth={1.3} />
          <h3>{filter === "mine" && mine.length === 0 ? "내 코인을 먼저 등록해 주세요" : "조건에 맞는 서비스가 없어요"}</h3>
          <p>{filter === "mine" && mine.length === 0 ? "MY에서 보유 코인을 추가하면 갈 수 있는 구역을 찾아드려요." : "다른 구역을 선택하거나 검색어와 필터를 바꿔보세요."}</p>
          {filter === "mine" && mine.length === 0 ? <Link href="/app/my">코인 등록하기 <ArrowRight size={14} /></Link> : <button type="button" onClick={clearFilters}>필터 초기화 <ArrowRight size={14} /></button>}
        </div>
      ) : (
        <ul className="map-service-list" aria-label={`${resultsTitle} 목록`}>
          {visiblePlaces.map((place) => (
            <li key={place.id}>
              <button type="button" className={`map-service${selectedId === place.id ? " is-selected" : ""}`} onClick={() => selectPlace(place)}>
                <span className="map-service-icon" style={{ "--district-color": CITY_DISTRICTS.find((item) => item.id === place.district)?.color } as React.CSSProperties}>
                  {visited[place.id] ? <Check size={17} /> : place.name.slice(0, 1)}
                </span>
                <span className="map-service-copy">
                  <strong>{place.name}{bookmarks.includes(place.id) && <Bookmark size={11} fill="currentColor" aria-label="저장됨" />}</strong>
                  <span>{place.action}</span>
                  <small>{place.coins.slice(0, 3).join(" · ")}{place.coins.length > 3 ? ` +${place.coins.length - 3}` : ""}</small>
                </span>
                <ArrowRight size={15} className="map-service-arrow" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <main ref={rootRef} className="map-explorer">
      <aside className="map-sidebar" aria-label="지도 탐색">
        <header className="map-brand-header">
          <Link href="/app" className="map-brand" aria-label="BlockMAP 홈">
            <svg width="25" height="27" viewBox="0 0 25 27" fill="none" aria-hidden="true"><path d="M1 7 12.5 1 24 7 12.5 13 1 7Z" fill="currentColor"/><path d="m1 13 11.5 6L24 13v6L12.5 25 1 19v-6Z" fill="currentColor"/></svg>
            <span>BLOCKMAP<span className="map-brand-period">.</span></span>
          </Link>
          <span className="map-edition">CITY GUIDE / 01</span>
        </header>

        <div className="map-intro"><span className="map-eyebrow">A WORLD OF POSSIBILITIES</span><h1>코인이 도착하는 곳<span>.</span></h1><p>작은 가능성들이 모여, 하나의 도시로.</p></div>

        <div className="map-filters">
          <div className="map-filter-row">
            <label className="map-coin-filter">
              <span className="map-coin-label">WITH</span>
              <select aria-label="코인 필터" value={filter} onChange={(event) => changeFilter(event.target.value)}>
                <option value="all">모든 코인</option>
                <option value="mine">내가 가진 코인</option>
                {COINS.map((coin) => <option key={coin.symbol} value={coin.symbol}>{coin.symbol} · {coin.name}</option>)}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </label>
            <button type="button" className={`map-bookmark-toggle${onlyBookmarks ? " is-active" : ""}`} aria-label="저장한 서비스만 보기" aria-pressed={onlyBookmarks} onClick={() => { setOnlyBookmarks((value) => !value); setDrawerOpen(true); }}><Bookmark size={17} fill={onlyBookmarks ? "currentColor" : "none"} /></button>
          </div>
          <div className="map-search">
            <Search size={16} aria-hidden="true" />
            <input type="search" aria-label="서비스 또는 하고 싶은 일 검색" placeholder="어디로 가볼까요?" value={query} onChange={(event) => { closePlace(); setQuery(event.target.value); setActiveDistrict(null); setDrawerOpen(Boolean(event.target.value.trim())); }} />
            {query && <button type="button" aria-label="검색어 지우기" onClick={() => setQuery("")}><X size={14} /></button>}
          </div>
          {filter !== "all" && <div className="map-filter-summary"><span>{filter === "mine" ? "내 코인" : filter}으로 갈 수 있는 <strong>{filteredPlaces.length}곳</strong></span>{filter !== "mine" && <Link href={`/coin/${filter.toLowerCase()}`} aria-label={`${filter} 자세히 보기`}><ArrowRight size={13} /></Link>}</div>}
        </div>

        <div className="map-sidebar-content">
          {browsingServices ? (
            <><div className="map-list-heading"><button type="button" aria-label="구역 목록으로 돌아가기" onClick={() => { closePlace(); setShowServices(false); setActiveDistrict(null); setQuery(""); setOnlyBookmarks(false); }}><ArrowLeft size={17} /></button><h2>{resultsTitle}</h2><span>{visiblePlaces.length.toString().padStart(2, "0")}</span></div>{serviceList()}</>
          ) : (
            <><div className="map-section-heading"><span>EXPLORE DISTRICTS</span><span>08</span></div>
              <nav className="map-district-list" aria-label="구역 선택">
                {CITY_DISTRICTS.map((item, index) => <button type="button" key={item.id} className={`map-district-row${activeDistrict === item.id ? " is-active" : ""}${counts[item.id] === 0 ? " is-empty" : ""}`} onClick={() => selectDistrict(item.id)} aria-pressed={activeDistrict === item.id}>
                  <span className="map-district-number">{String(index + 1).padStart(2, "0")}</span><span className="map-district-name"><strong>{DISTRICT_BY_ID[item.id].name}</strong><small>{item.english}</small></span><span className="map-district-count">{counts[item.id]}</span><ArrowDownLeft size={14} /></button>)}
              </nav>
              <button type="button" className="map-all-services" onClick={browseAll}><Grid2X2 size={15} />전체 서비스 둘러보기<span>{filteredPlaces.length}</span><ArrowRight size={14} /></button>
            </>
          )}
        </div>
        <footer className="map-sidebar-footer"><span className="map-status-dot" /><span>{PLACES.length}개의 쓰임처, 당신의 다음 목적지.</span></footer>
      </aside>

      <section className="map-stage" aria-label="인터랙티브 3D 도시 지도">
        <CityScene activeDistrict={activeDistrict} counts={counts} onDistrictSelect={selectDistrict} view={view} zoomCommand={zoomCommand} resetKey={resetKey} />
        <div className="map-stage-heading"><span className="map-eyebrow">THE BLOCKMAP DISTRICT</span><p>{district ? district.tagline : "오늘은 어느 구역으로 가볼까요?"}</p></div>
        <div className="map-world-key"><span className="map-status-dot" /><span>{filteredPlaces.length} PLACES TO DISCOVER</span></div>
        <div className="map-compass" aria-hidden="true"><span>N</span><Compass size={31} strokeWidth={1.1} /></div>
        <div className="map-controls" aria-label="지도 보기 설정">
          <div className="map-view-toggle"><button type="button" aria-pressed={view === "perspective"} onClick={() => setView("perspective")}>3D</button><button type="button" aria-pressed={view === "top"} onClick={() => setView("top")}>위에서</button></div>
          <div className="map-camera-controls"><button type="button" aria-label="지도 확대" onClick={() => setZoomCommand({ direction: 1, id: Date.now() })}><Plus size={19} /></button><button type="button" aria-label="지도 축소" onClick={() => setZoomCommand({ direction: -1, id: Date.now() })}><Minus size={19} /></button><button type="button" aria-label="전체 도시 보기" onClick={resetView}><LocateFixed size={18} /></button></div>
        </div>
        <div className="map-explore-hint"><MousePointer2 size={14} /><span>드래그해 둘러보고, 구역을 눌러 탐색하세요</span></div>
        <div className="map-corner-caption"><span>8 DISTRICTS</span><span>ONE CONNECTED WORLD</span></div>
      </section>

      <section ref={mobileBrowseRef} className={`map-mobile-browse${drawerOpen ? " is-open" : ""}`} aria-label="구역과 서비스 둘러보기">
        <nav className="map-mobile-districts" aria-label="모바일 구역 선택">
          <button type="button" onClick={browseAll} aria-pressed={!activeDistrict}><Grid2X2 size={13} />전체<span>{filteredPlaces.length}</span></button>
          {CITY_DISTRICTS.map((item, index) => <button type="button" key={item.id} onClick={() => selectDistrict(item.id)} aria-pressed={activeDistrict === item.id}><small>{String(index + 1).padStart(2, "0")}</small>{DISTRICT_BY_ID[item.id].name}<span>{counts[item.id]}</span></button>)}
        </nav>
        <button type="button" className="map-mobile-list-toggle" aria-expanded={drawerOpen} aria-controls="map-mobile-results" onClick={() => setDrawerOpen((open) => !open)}><span><strong>{district ? district.name : queryText ? "검색 결과" : "도시 속 서비스"}</strong><small>{visiblePlaces.length}곳 둘러보기</small></span>{drawerOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}</button>
        <div id="map-mobile-results" className="map-mobile-results" hidden={!drawerOpen}>{drawerOpen && serviceList(true)}</div>
      </section>

      {selected && <div className="map-place-detail"><PlaceSheet key={selected.id} place={selected} onClose={closePlace} onGo={(id) => { const place = PLACE_BY_ID[id]; if (place) selectPlace(place); }} /></div>}
    </main>
  );
}
