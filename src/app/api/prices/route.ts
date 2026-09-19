import { COINS } from "@/lib/data";

export type PriceMap = Record<string, { price: number; changeRate: number }>;

type UpbitTicker = {
  market: string;
  trade_price: number;
  signed_change_rate: number;
};

// 업비트 시세 조회 API는 키가 필요 없다. 서버에서 10초 캐시로 프록시해 호출량을 줄인다.
export async function GET() {
  const markets = COINS.map((c) => c.market).join(",");
  try {
    const res = await fetch(`https://api.upbit.com/v1/ticker?markets=${markets}`, {
      next: { revalidate: 10 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`upbit ${res.status}`);
    const tickers: UpbitTicker[] = await res.json();

    const prices: PriceMap = {};
    for (const t of tickers) {
      const coin = COINS.find((c) => c.market === t.market);
      if (coin) prices[coin.symbol] = { price: t.trade_price, changeRate: t.signed_change_rate };
    }
    return Response.json({ prices, source: "upbit", at: Date.now() });
  } catch {
    return Response.json({ prices: {}, source: "upbit", error: "unavailable" }, { status: 502 });
  }
}
