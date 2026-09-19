"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CoinSymbol, Review } from "./data";

type Holdings = Partial<Record<CoinSymbol, number>>;

type State = {
  nickname: string;
  holdings: Holdings;
  visited: Record<string, string>; // placeId -> 방문일
  bookmarks: string[];
  myReviews: Record<string, Review[]>;
  walletAddress: string | null;

  setNickname: (name: string) => void;
  setHolding: (symbol: CoinSymbol, amount: number) => void;
  toggleVisited: (placeId: string) => void;
  toggleBookmark: (placeId: string) => void;
  addReview: (placeId: string, review: Omit<Review, "id" | "createdAt" | "mine" | "author">) => void;
  setWallet: (address: string | null) => void;
};

// Supabase 연결 전까지는 브라우저(localStorage)에만 저장한다.
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      nickname: "탐험가",
      holdings: {},
      visited: {},
      bookmarks: [],
      myReviews: {},
      walletAddress: null,

      setNickname: (nickname) => set({ nickname }),
      setHolding: (symbol, amount) =>
        set((s) => {
          const holdings = { ...s.holdings };
          if (amount > 0) holdings[symbol] = amount;
          else delete holdings[symbol];
          return { holdings };
        }),
      toggleVisited: (placeId) =>
        set((s) => {
          const visited = { ...s.visited };
          if (visited[placeId]) delete visited[placeId];
          else visited[placeId] = new Date().toISOString().slice(0, 10);
          return { visited };
        }),
      toggleBookmark: (placeId) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(placeId)
            ? s.bookmarks.filter((id) => id !== placeId)
            : [...s.bookmarks, placeId],
        })),
      addReview: (placeId, review) =>
        set((s) => ({
          myReviews: {
            ...s.myReviews,
            [placeId]: [
              {
                ...review,
                id: `${placeId}-${Date.now()}`,
                author: get().nickname,
                createdAt: new Date().toISOString().slice(0, 10),
                mine: true,
              },
              ...(s.myReviews[placeId] ?? []),
            ],
          },
        })),
      setWallet: (walletAddress) => set({ walletAddress }),
    }),
    { name: "blockmap-v1", skipHydration: true },
  ),
);

export function heldSymbols(holdings: Holdings): CoinSymbol[] {
  return (Object.keys(holdings) as CoinSymbol[]).filter((s) => (holdings[s] ?? 0) > 0);
}
