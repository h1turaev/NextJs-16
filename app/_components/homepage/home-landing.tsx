"use client";

import { columns } from "@/_components/homepage/columns";
import { DataTable } from "@/_components/homepage/data-table";
import DarkVeil from "@/_components/dark-veil/dark-veil";
import type { Album } from "@/_components/homepage/types";

export default function HomeLanding({ albums }: { albums: Album[] }) {
  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0">
        <DarkVeil
          className="h-full min-h-full"
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white drop-shadow-sm">
          Albums
        </h2>
        <p className="mb-8 max-w-xl text-sm text-white/80">
          Dark Veil background with shadcn-style Data Table.
        </p>
        <DataTable columns={columns} data={albums} />
      </main>
    </div>
  );
}
