import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, LucideBookOpen, LucideCopy, LucidePencil, LucideTrash2, MoreHorizontal } from "lucide-react"

import { Account } from "@/application/modules/account/services/dto/account-dto"
import { Button } from "@/application/shared/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu"

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase px-3">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "roleCode",
    header: () => <div className="text-center">Função</div>,
    cell: ({ row }) => {
      return <div className="font-bold text-center">{row.getValue("roleCode")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Açoes</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(account.email)}
              >
                <LucideCopy />
                Copiar e-mail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert('Navegar para empréstimos do usuário')}
              >
                <LucideBookOpen />
                Ver empréstimos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="flex flex-col">
                <DropdownMenuItem variant="default">
                  <LucidePencil />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <LucideTrash2 />
                  Remover
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
