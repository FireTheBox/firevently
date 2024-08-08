"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LucideTrash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ICodaPageWithId } from "@/lib/coda/coda-page.definition";

export const columns: ColumnDef<ICodaPageWithId>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "url",
    header: "Link da página",
  },
  {
    accessorKey: "tableId",
    header: "ID da tabela",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const codaPage = row.original;

      return (
        <Button
          variant="ghost"
          size={"icon"}
          onClick={() =>
            fetch("/api/coda", {
              method: "DELETE",
              body: JSON.stringify({ pageId: codaPage.id }),
            })
          }
        >
          <LucideTrash2 />
        </Button>
      );
    },
  },
];
