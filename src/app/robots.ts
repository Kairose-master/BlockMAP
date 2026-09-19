import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 앱 화면(/app)은 개인 상태를 보여주므로 검색에 올리지 않는다
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/app", "/api"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
