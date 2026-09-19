"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

// 기기의 공유 시트를 띄우고, 지원하지 않으면 링크를 복사한다.
export function ShareButton({ title, text, path, className }: { title: string; text: string; path: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = new URL(path, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 사용자가 공유를 취소한 경우
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className={className ?? "flex h-12 items-center justify-center gap-2 rounded-2xl border border-line px-4 text-sm font-bold text-ink active:opacity-70"}
    >
      {copied ? <Check size={16} className="text-lime" /> : <Share2 size={16} />}
      {copied ? "링크를 복사했어요" : "공유하기"}
    </button>
  );
}
