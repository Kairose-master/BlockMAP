"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Share2, X } from "lucide-react";
import { DISTRICTS, PLACES, placesForCoins } from "@/lib/data";
import { heldSymbols, useStore } from "@/lib/store";

// 인스타 스토리 비율(9:16)의 공유 카드. 보유 수량·금액은 넣지 않고 코인 종류만 담는다.
const W = 1080;
const H = 1920;
const FONT = '"Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", sans-serif';
const LIME = "#78f7c5";

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export function ShareCard({ onClose }: { onClose: () => void }) {
  const holdings = useStore((s) => s.holdings);
  const visited = useStore((s) => s.visited);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const draw = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const mine = heldSymbols(holdings);
      const reachable = placesForCoins(mine);
      const visitedCount = Object.keys(visited).length;
      const rows = DISTRICTS.map((d) => {
        const all = PLACES.filter((p) => p.district === d.id);
        return { d, total: all.length, lit: all.filter((p) => reachable.includes(p)).length };
      });

      // 웹폰트는 글자 묶음별로 늦게 내려오므로, 카드에 쓸 글자를 먼저 불러둔다
      const allText = `BLOCKMAP 내 코인으로 갈 수 있는 곳 해본 곳 내 코인은 어디에 쓸 수 있을까 ${rows.map((r) => r.d.name).join(" ")} ${mine.join(" ")} 0123456789/+`;
      try {
        await Promise.all([document.fonts.load(`800 72px ${FONT}`, allText), document.fonts.load(`600 40px ${FONT}`, allText)]);
      } catch {
        // 폰트를 못 불러와도 기본 글꼴로 그린다
      }
      if (cancelled) return;

      ctx.fillStyle = "#070a0e";
      ctx.fillRect(0, 0, W, H);

      // 은은한 점 무늬 대신 블록 무늬
      ctx.fillStyle = "#0d141b";
      for (let y = 0; y < H; y += 120) for (let x = (y / 120) % 2 === 0 ? 0 : 60; x < W; x += 120) ctx.fillRect(x + 8, y + 8, 44, 44);

      ctx.textBaseline = "alphabetic";
      ctx.font = `800 52px ${FONT}`;
      ctx.fillStyle = "#f4f8fb";
      ctx.fillText("BLOCK", 90, 170);
      ctx.fillStyle = LIME;
      ctx.fillText("MAP", 90 + ctx.measureText("BLOCK").width, 170);

      ctx.fillStyle = "#f4f8fb";
      ctx.font = `800 84px ${FONT}`;
      ctx.fillText("내 코인으로", 90, 330);
      ctx.fillText("갈 수 있는 곳", 90, 436);

      ctx.fillStyle = LIME;
      ctx.font = `800 290px ${FONT}`;
      const big = String(reachable.length);
      ctx.fillText(big, 80, 720);
      const bigW = ctx.measureText(big).width;
      ctx.fillStyle = "#a4b2bf";
      ctx.font = `700 76px ${FONT}`;
      ctx.fillText(`/ ${PLACES.length}곳`, 104 + bigW, 720);

      // 코인 종류 (수량·금액 없음)
      let cx = 90;
      let cy = 790;
      ctx.font = `700 38px ${FONT}`;
      const shown = mine.slice(0, 10);
      const chips = mine.length > shown.length ? [...shown, `+${mine.length - shown.length}`] : shown;
      for (const label of chips) {
        const w = ctx.measureText(label).width + 56;
        if (cx + w > W - 90) {
          cx = 90;
          cy += 92;
        }
        roundRect(ctx, cx, cy, w, 72, 36);
        ctx.strokeStyle = LIME;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = LIME;
        ctx.fillText(label, cx + 28, cy + 50);
        cx += w + 16;
      }

      // 구역별 막대: 코인 칩 아래부터 하단 문구 위까지 남는 높이에 맞춰 간격을 잡는다
      const footerTop = H - 330;
      let y = cy + 72 + 100;
      const gap = Math.min(112, (footerTop - y) / rows.length);
      for (const { d, total, lit } of rows) {
        ctx.fillStyle = `hsl(${d.hue} 60% 75%)`;
        ctx.font = `700 40px ${FONT}`;
        ctx.fillText(d.name, 90, y);
        ctx.fillStyle = "#a4b2bf";
        ctx.font = `600 36px ${FONT}`;
        const count = `${lit} / ${total}`;
        ctx.fillText(count, W - 90 - ctx.measureText(count).width, y);
        roundRect(ctx, 90, y + 22, W - 180, 18, 9);
        ctx.fillStyle = "#151e27";
        ctx.fill();
        if (lit > 0) {
          roundRect(ctx, 90, y + 22, Math.max(((W - 180) * lit) / total, 18), 18, 9);
          ctx.fillStyle = LIME;
          ctx.fill();
        }
        y += gap;
      }

      ctx.fillStyle = "#f4f8fb";
      ctx.font = `700 44px ${FONT}`;
      ctx.fillText(`그중 해본 곳 ${visitedCount}곳`, 90, H - 250);

      ctx.fillStyle = "#a4b2bf";
      ctx.font = `600 40px ${FONT}`;
      ctx.fillText("내 코인은 어디에 쓸 수 있을까?", 90, H - 150);
      ctx.fillStyle = LIME;
      ctx.font = `800 44px ${FONT}`;
      ctx.fillText(window.location.host, 90, H - 90);

      setReady(true);
    };

    draw();
    return () => {
      cancelled = true;
    };
  }, [holdings, visited]);

  const toFile = () =>
    new Promise<File | null>((resolve) => {
      canvasRef.current?.toBlob((blob) => resolve(blob ? new File([blob], "blockmap.png", { type: "image/png" }) : null), "image/png");
    });

  const share = async () => {
    const file = await toFile();
    if (!file) return;
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "BlockMAP", text: "내 코인으로 갈 수 있는 곳" });
        return;
      }
      save(file);
      setMessage("이 브라우저는 바로 공유를 지원하지 않아 이미지로 저장했어요.");
    } catch {
      // 사용자가 공유를 취소한 경우
    }
  };

  const save = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="공유 카드" className="absolute inset-0 z-50 flex flex-col bg-black/85 p-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">공유 카드</p>
        <button type="button" aria-label="닫기" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-ink-2">
          <X size={18} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center py-4">
        <canvas ref={canvasRef} width={W} height={H} className="h-full max-h-full w-auto rounded-3xl border border-line" style={{ aspectRatio: `${W} / ${H}` }} />
      </div>

      <p className="pb-3 text-center text-xs text-ink-3">{message || "보유 수량과 금액은 카드에 들어가지 않아요. 코인 종류만 보여요."}</p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!ready}
          onClick={async () => {
            const file = await toFile();
            if (file) save(file);
          }}
          className="flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl border border-line text-[15px] font-bold disabled:opacity-40"
        >
          <Download size={18} />
          이미지 저장
        </button>
        <button type="button" disabled={!ready} onClick={share} className="flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-lime text-[15px] font-bold text-lime-ink disabled:opacity-40">
          <Share2 size={18} />
          공유하기
        </button>
      </div>
    </div>
  );
}
