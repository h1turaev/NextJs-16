import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-0 flex-1">{children}</div>;
}
