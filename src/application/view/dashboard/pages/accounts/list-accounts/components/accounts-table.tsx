import { useGetAccounts } from "@/application/modules/account/hooks/use-get-accounts";

import { Table } from "@/application/shared/components/table";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useState } from 'react';
import { columns } from "./accounts-table-columns";

export function AccountsTable() {
  const { accounts, pagination } = useGetAccounts();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const table = useReactTable({
    data: accounts,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <Table.Toolkit
        table={table}
        filterKey="email"
        filterPlaceholder="Filtrar por e-mail..."
        mappedView={{
          name: 'Nome',
          email: 'Email',
          roleCode: 'Função',
        }}
      />
      <Table.Content
        table={table}
        columnsLength={columns.length}
        placeholder="Nenhuma conta encontrada."
      />
      <Table.Footer pagination={pagination} />
    </div>
  )
}
