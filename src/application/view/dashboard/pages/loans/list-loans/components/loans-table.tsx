
import { useGetLoans } from "@/application/modules/loans/hooks/use-get-loans";
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
import { useParams } from "react-router";
import { columns } from "./loans-table-columns";


export function LoansTable() {
  const { accountId } = useParams<{ accountId?: string }>();
  const {loans, pagination} = useGetLoans({ accountId });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const table = useReactTable({
    data: loans,
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
    <div>
      <Table.Toolkit
        table={table}
        mappedView={{
          account: 'Usuário',
          book: 'Título do livro',
          createdAt: 'Feito em',
          dueDate: 'Prazo limite',
          returnDate: 'Data de devolução'
        }}
      />
      <Table.Content
        table={table}
        columnsLength={columns.length}
        placeholder="Nenhum empréstimo encontrado encontrada."
      />
      <Table.Footer pagination={pagination} />
    </div>
  )
}
