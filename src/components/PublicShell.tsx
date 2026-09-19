import Link from "next/link";
import { Logo } from "./Logo";

// 로그인 없이 검색으로 들어오는 공개 페이지의 틀
export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/90 px-5 py-4 backdrop-blur">
        <Link href="/" aria-label="BlockMAP 홈">
          <Logo size={18} />
        </Link>
        <Link href="/app/map" className="rounded-full bg-lime px-3.5 py-1.5 text-xs font-bold text-lime-ink">
          지도 열기
        </Link>
      </header>
      <main className="px-5 pb-16 pt-6">{children}</main>
      <footer className="border-t border-line px-5 py-6 text-xs leading-relaxed text-ink-3">
        BlockMAP은 투자 조언을 하지 않고, 결제나 교환을 중개하지 않습니다. 코인을 &lsquo;어디에 쓸 수 있는지&rsquo;와 검증된 공식 주소만 안내해요.
        쓰임처 정보는 바뀔 수 있으니 이용 전에 공식 사이트에서 다시 확인하세요.
        <div className="mt-3 flex gap-4 font-semibold text-ink-2">
          <Link href="/coin">코인별 쓰임처</Link>
          <Link href="/app/map">쓰임처 지도</Link>
        </div>
      </footer>
    </div>
  );
}
