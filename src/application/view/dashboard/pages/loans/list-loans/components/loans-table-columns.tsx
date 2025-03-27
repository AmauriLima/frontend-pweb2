import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Loan } from "@/application/modules/loans/services/dto/loans-dto"
import { Button } from "@/application/shared/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/application/shared/components/ui/hover-card"
import { formatDate } from "@/application/shared/lib/utils"
import { LoansTableActions } from "./loans-table-actions"

export const columns: ColumnDef<Loan>[] = [
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuário
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase px-3">{row.getValue("account")?.name}</div>,
  },
  {
    accessorKey: "book",
    header: "Título do livro",
    cell: ({ row }) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="capitalize truncate max-w-36">{row.getValue("book").name}</div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{row.getValue("book").name}</h4>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Feito em</div>,
    cell: ({ row }) => {
      return <div className="text-center">{formatDate(row.getValue("createdAt"))}</div>
    },
  },
  {
    accessorKey: "dueDate",
    header: () => <div className="text-center">Prazo limite</div>,
    cell: ({ row }) => {
      return <div className="text-center">{formatDate(row.getValue("dueDate"))}</div>
    },
  },
  {
    accessorKey: "returnDate",
    header: () => <div className="text-center">Data de devolução</div>,
    cell: ({ row }) => {
      return <div className="text-center">{formatDate(row.getValue("returnDate")) ?? 'Não devolvido'}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const loan = row.original;
      return <LoansTableActions loan={loan} />
    },
  },
]
