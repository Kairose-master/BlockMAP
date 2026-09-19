"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

// localStorage 값은 클라이언트에서만 읽어 SSR 결과와 어긋나지 않게 한다.
export function StoreHydrator() {
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);
  return null;
}
