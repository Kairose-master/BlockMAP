import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "BlockMAP — 내 코인의 쓰임처 지도", template: `%s | ${SITE_NAME}` },
  description: "지갑에 묶여 있는 코인, 어디에 쓸 수 있는지 지도에서 찾아보세요.",
  openGraph: { siteName: SITE_NAME, locale: "ko_KR", type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0b0b0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="h-full">
        <div className="mx-auto h-full w-full max-w-[480px] bg-bg relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
