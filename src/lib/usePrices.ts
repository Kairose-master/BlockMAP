"use client";

import { useEffect, useState } from "react";
import type { PriceMap } from "@/app/api/prices/route";

let cache: PriceMap = {};
const listeners = new Set<(p: PriceMap) => void>();
let timer: ReturnType<typeof setInterval> | null = null;

async function load() {
  try {
    const res = await fetch("/api/prices");
    if (!res.ok) return;
    const json = await res.json();
    cache = json.prices ?? {};
    listeners.forEach((l) => l(cache));
  } catch {
    // 시세가 없어도 앱은 동작한다
  }
}

export function usePrices(): PriceMap {
  const [prices, setPrices] = useState<PriceMap>(cache);

  useEffect(() => {
    listeners.add(setPrices);
    if (!timer) {
      load();
      timer = setInterval(load, 15_000);
    }
    return () => {
      listeners.delete(setPrices);
      if (listeners.size === 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, []);

  return prices;
}

export const formatKRW = (n: number) =>
  n >= 100_000_000
    ? `${(n / 100_000_000).toFixed(2)}억원`
    : n >= 10_000
      ? `${Math.round(n / 1000) / 10}만원`
      : `${Math.round(n).toLocaleString("ko-KR")}원`;

export const formatCoinAmount = (n: number) =>
  n >= 100 ? n.toFixed(0) : n >= 1 ? n.toFixed(2) : n >= 0.001 ? n.toFixed(4) : n.toFixed(6);
