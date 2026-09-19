import { UseMap } from "@/components/UseMap";
import { COINS, type CoinSymbol } from "@/lib/data";

export default async function MapPage({ searchParams }: PageProps<"/app/map">) {
  const { place, filter, coin } = await searchParams;
  const symbol = typeof coin === "string" ? COINS.find((c) => c.symbol === coin.toUpperCase())?.symbol : undefined;
  const initialFilter: "mine" | CoinSymbol | undefined = filter === "mine" ? "mine" : symbol;
  const initialPlaceId = typeof place === "string" ? place : undefined;
  return <UseMap key={`${initialFilter ?? "all"}:${initialPlaceId ?? ""}`} initialPlaceId={initialPlaceId} initialFilter={initialFilter} />;
}
