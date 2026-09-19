// 배포 주소. NEXT_PUBLIC_SITE_URL(커스텀 도메인)을 최우선으로 쓰고,
// 없으면 Vercel이 빌드 때 넣어주는 프로덕션 주소를 쓴다.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? fromVercel ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "BlockMAP";
