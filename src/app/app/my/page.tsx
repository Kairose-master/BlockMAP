"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import { COINS, DISTRICTS, PLACES } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatKRW, usePrices } from "@/lib/usePrices";

type Eip1193 = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };

export default function MyPage() {
  const prices = usePrices();
  const { nickname, holdings, visited, bookmarks, myReviews, walletAddress } = useStore();
  const setNickname = useStore((s) => s.setNickname);
  const setHolding = useStore((s) => s.setHolding);
  const setWallet = useStore((s) => s.setWallet);
  const [walletMsg, setWalletMsg] = useState("");

  const visitedCount = Object.keys(visited).length;
  const reviewCount = Object.values(myReviews).reduce((n, list) => n + list.length, 0);

  // 지갑 연결은 옵션. 주소와 ETH 잔액만 읽고, 서명이나 전송은 요청하지 않는다.
  const connectWallet = async () => {
    const eth = (window as unknown as { ethereum?: Eip1193 }).ethereum;
    if (!eth) {
      setWalletMsg("이 브라우저에 지갑이 없어요. 메타마스크 같은 지갑을 설치한 뒤 다시 시도해주세요.");
      return;
    }
    try {
      const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
      const address = accounts[0];
      if (!address) return;
      setWallet(address);
      const hex = (await eth.request({ method: "eth_getBalance", params: [address, "latest"] })) as string;
      const balance = Number(BigInt(hex)) / 1e18;
      if (balance > 0) setHolding("ETH", Number(balance.toFixed(4)));
      setWalletMsg(balance > 0 ? "지갑의 ETH 잔액을 보유 코인에 반영했어요." : "연결됐어요. 이 지갑에는 ETH가 없네요.");
    } catch {
      setWalletMsg("연결이 취소됐어요.");
    }
  };

  return (
    <main className="no-scrollbar hairline-grid h-full overflow-y-auto px-5 pb-28 pt-8">
      <section className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[26px] border border-lime/20 bg-[radial-gradient(circle_at_30%_20%,rgba(120,247,197,0.22),transparent_55%),#111a21] text-3xl font-extrabold text-lime shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
          {nickname.slice(0, 1)}
        </div>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value.slice(0, 12))}
          aria-label="닉네임"
          className="mt-3 w-40 bg-transparent text-center text-xl font-extrabold outline-none focus:border-b focus:border-lime"
        />
        <dl className="mt-4 flex gap-10 text-center">
          <Stat label="가본 곳" value={visitedCount} />
          <Stat label="후기" value={reviewCount} />
          <Stat label="북마크" value={bookmarks.length} />
        </dl>
      </section>

      <section className="pt-8">
        <h2 className="text-lg font-extrabold">보유 코인</h2>
        <p className="mt-1 text-xs text-ink-3">대략적인 수량만 적어도 돼요. 이 기기에만 저장됩니다.</p>
        <ul className="mt-3 space-y-1.5">
          {COINS.map((c) => {
            const amount = holdings[c.symbol] ?? 0;
            const price = prices[c.symbol]?.price;
            return (
              <li key={c.symbol} className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-surface/75 px-4 py-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-xs text-ink-3">{amount > 0 && price ? `≈ ${formatKRW(amount * price)}` : c.symbol}</p>
                </div>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  value={amount || ""}
                  placeholder="0"
                  aria-label={`${c.name} 보유 수량`}
                  onChange={(e) => setHolding(c.symbol, Math.max(0, Number(e.target.value) || 0))}
                  className="h-10 w-28 rounded-xl bg-surface-2 px-3 text-right text-sm font-bold outline-none focus:ring-1 focus:ring-lime"
                />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="pt-8">
        <h2 className="text-lg font-extrabold">지갑 연결 <span className="text-xs font-semibold text-ink-3">선택</span></h2>
        <div className="glass-panel mt-3 rounded-2xl p-4">
          {walletAddress ? (
            <p className="flex items-center gap-2 text-sm font-bold text-lime">
              <Wallet size={16} />
              {walletAddress.slice(0, 6)}…{walletAddress.slice(-4)}
              <button type="button" onClick={() => { setWallet(null); setWalletMsg(""); }} className="ml-auto text-xs font-semibold text-ink-3 underline">
                연결 해제
              </button>
            </p>
          ) : (
            <button type="button" onClick={connectWallet} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-line text-sm font-bold">
              <Wallet size={16} />
              지갑 연결하고 잔액 불러오기
            </button>
          )}
          <p className="mt-2 text-xs leading-relaxed text-ink-3">
            {walletMsg || "주소와 잔액만 읽어요. BlockMAP은 서명이나 전송을 요청하지 않습니다."}
          </p>
        </div>
      </section>

      <section className="pt-8">
        <h2 className="text-lg font-extrabold">구역 배지</h2>
        <p className="mt-1 text-xs text-ink-3">각 구역에서 한 곳이라도 해보면 배지가 열려요.</p>
        <ul className="mt-3 grid grid-cols-4 gap-2">
          {DISTRICTS.map((d) => {
            const inDistrict = PLACES.filter((p) => p.district === d.id);
            const done = inDistrict.filter((p) => visited[p.id]).length;
            const unlocked = done > 0;
            return (
              <li key={d.id} className="flex flex-col items-center rounded-2xl border border-white/[0.05] bg-surface/70 px-1 py-3 text-center">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold"
                  style={
                    unlocked
                      ? { background: `hsl(${d.hue} 60% 70%)`, color: `hsl(${d.hue} 50% 12%)` }
                      : { background: "var(--color-surface-2)", color: "var(--color-ink-3)" }
                  }
                >
                  {done}/{inDistrict.length}
                </span>
                <span className={`mt-1.5 text-[11px] font-semibold ${unlocked ? "text-ink" : "text-ink-3"}`}>{d.name}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dd className="text-xl font-extrabold">{value}</dd>
      <dt className="text-xs text-ink-2">{label}</dt>
    </div>
  );
}
