"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { Album } from "./types";

export const columns: ColumnDef<Album>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-[640px]">{row.getValue("title")}</span>
    ),
  },
];
