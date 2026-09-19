import { BottomNav } from "@/components/BottomNav";
import { StoreHydrator } from "@/components/StoreHydrator";

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="relative h-full">
      <StoreHydrator />
      {children}
      <BottomNav />
    </div>
  );
}
