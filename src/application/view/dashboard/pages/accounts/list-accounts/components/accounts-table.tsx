import { useGetAccounts } from "@/application/modules/account/hooks/use-get-accounts";
import { Account } from "@/application/modules/account/services/dto/account-dto";
import { Button } from "@/application/shared/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { Input } from "@/application/shared/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious } from "@/application/shared/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/application/shared/components/ui/table";
import { generateEllipsisPagination } from "@/application/shared/lib/utils";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { LucideSettings2 } from "lucide-react";
import { useMemo, useState } from 'react';
import { columns } from "./accounts-table-columns";

export function AccountsTable() {
  const { accounts, pagination } = useGetAccounts();

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})

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

  const pages = useMemo(() => {
    return generateEllipsisPagination(
      pagination.currentPage,
      pagination.totalPages,
    );
  }, [
    pagination.currentPage,
    pagination.totalPages,
  ]);

  const mappedView: Record<keyof Pick<Account, 'name' | 'email' | 'roleCode'>, string> = {
    name: 'Nome',
    email: 'Email',
    roleCode: 'Função'
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filtrar por e-mail..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <LucideSettings2 /> Ver
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {(mappedView[column.id as "name" | "email" | "roleCode"]) ?? column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhuma conta encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TableCaption className="flex justify-between items-center gap-4">
        <span>
          Página {pagination.currentPage} de {pagination.totalPages}
        </span>
        <Pagination className="flex shrink justify-end mx-0 w-fit">
          <PaginationContent className="">
            <PaginationItem>
              <PaginationFirst
                onClick={pagination.firstPage}
                isActive={pagination.currentPage !== 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={pagination.previousPage}
                isActive={pagination.hasPreviousPage}
                aria-disabled={!pagination.hasPreviousPage}
              />
            </PaginationItem>

            {pages.map((page, index) => {
              const isEllipsisPosition = typeof page === 'string';

              if (isEllipsisPosition) {
                return (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={pagination.currentPage === page}
                    onClick={() => pagination.setPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={pagination.nextPage}
                isActive={pagination.hasNextPage}
                aria-disabled={!pagination.hasNextPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                onClick={pagination.lastPage}
                isActive={pagination.currentPage !== pagination.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TableCaption>
    </div>
  )
}
