import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Landing() {
  return (
    <main className="flex h-full flex-col items-center justify-between px-6 py-16">
      <div />
      <div className="flex flex-col items-center text-center">
        <Logo size={40} />
        <p className="mt-5 text-lg leading-relaxed text-ink">
          지갑에 묶여 있는 내 코인,
          <br />
          <span className="text-lime">어디에 쓸 수 있는지</span> 지도에서 찾아보세요
        </p>
      </div>

      <div className="w-full space-y-3">
        <Link
          href="/app/map"
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-lime text-base font-bold text-lime-ink active:opacity-80"
        >
          지도 둘러보기
        </Link>
        <Link
          href="/coin"
          className="flex h-14 w-full items-center justify-center rounded-2xl border border-line text-base font-semibold text-ink active:opacity-80"
        >
          코인별 쓰임처 수 보기
        </Link>
        <button
          type="button"
          disabled
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-surface-2 text-base font-semibold text-ink-3"
        >
          카카오 · Google 로그인 (준비 중)
        </button>
        <p className="pt-2 text-center text-xs leading-relaxed text-ink-3">
          BlockMAP은 투자 조언을 하지 않습니다.
          <br />
          검증된 공식 도메인과 실제 사용 후기만 안내해요.
        </p>
      </div>
    </main>
  );
}
