"use client";

import type { CoinSymbol } from "@/lib/data";
import { formatKRW, usePrices } from "@/lib/usePrices";

// 정적 페이지 안에서 업비트 현재가만 클라이언트에서 채운다
export function LivePrice({ symbol }: { symbol: CoinSymbol }) {
  const prices = usePrices();
  const p = prices[symbol];
  if (!p) return <span className="text-ink-3">시세 불러오는 중…</span>;
  return (
    <span>
      {formatKRW(p.price)}
      <span className={p.changeRate >= 0 ? "ml-1.5 text-red-400" : "ml-1.5 text-blue-400"}>
        {p.changeRate >= 0 ? "+" : ""}
        {(p.changeRate * 100).toFixed(1)}%
      </span>
      <span className="ml-1.5 text-ink-3">업비트</span>
    </span>
  );
}

// "5,000원 ≈ 0.0014 ETH" 처럼 최소 금액을 코인 수량으로 환산
export function LiveAmount({ symbol, krw }: { symbol: CoinSymbol; krw: number }) {
  const prices = usePrices();
  const p = prices[symbol];
  if (!p || krw <= 0) return null;
  const n = krw / p.price;
  const text = n >= 100 ? n.toFixed(0) : n >= 1 ? n.toFixed(2) : n >= 0.001 ? n.toFixed(4) : n.toFixed(6);
  return (
    <span className="text-ink-2">
      ≈ {text} {symbol}
    </span>
  );
}
