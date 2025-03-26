import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Account } from "@/application/modules/account/services/dto/account-dto"
import { Button } from "@/application/shared/components/ui/button"
import { AccountsTableActions } from "./accounts-table-actions"

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

      return <AccountsTableActions account={account} />
    },
  },
]
