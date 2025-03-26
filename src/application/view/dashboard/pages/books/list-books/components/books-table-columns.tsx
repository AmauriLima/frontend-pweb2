import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Book } from "@/application/modules/books/services/dto/book-dto"
import { Button } from "@/application/shared/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/application/shared/components/ui/hover-card"
import { BooksTableActions } from "./books-table-actions"

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase px-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="capitalize truncate max-w-36">{row.getValue("description")}</div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{row.getValue("name")}</h4>
              <p className="text-sm text-muted-foreground">{row.getValue("description")}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-center">Quantidade Total</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("totalAmount")}</div>
    },
  },
  {
    accessorKey: "loanAmount",
    header: () => <div className="text-center">Quantidade Emprestáda</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("loanAmount")}</div>
    },
  },
  {
    id: 'availableAmount',
    header: () => <div className="text-center">Quantidade Disponível</div>,
    cell: ({ row }) => {
      const loanAmount = row.getValue("loanAmount") as number;
      const totalAmount = row.getValue("totalAmount") as number;
      const availableAmount = totalAmount - loanAmount;

      return <div className="text-center">{availableAmount}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original
      return <BooksTableActions book={book} />
    },
  },
]
