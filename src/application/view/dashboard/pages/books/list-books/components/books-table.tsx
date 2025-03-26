
import { useDeleteBook } from "@/application/modules/books/hooks/use-delete-book";
import { useGetBooks } from "@/application/modules/books/hooks/use-get-books";
import { useUpdateBook } from "@/application/modules/books/hooks/use-update-account";
import { UpdateBookDTO } from "@/application/modules/books/services/dto/book-dto";
import { Table } from "@/application/shared/components/table";
import { useTable } from "@/application/shared/contexts/table-context";
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
import { useMemo, useState } from 'react';
import { BookForm } from "./book-form";
import { columns } from "./books-table-columns";

export function BooksTable() {
  const {books, pagination } = useGetBooks();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const table = useReactTable({
    data: books,
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

  const { selectedId, setIsEditDialogOpen } = useTable();
  const initialValues = useMemo(() => books.find((book) => book.id === selectedId), [books, selectedId]);

  const { deleteBook } = useDeleteBook();

  const { updateBook } = useUpdateBook();

  async function handleUpdateBook(dto: UpdateBookDTO) {
    await updateBook({ dto, bookId: selectedId! });

    setIsEditDialogOpen(false);
  }

  return (
    <div>
      <Table.Toolkit
        table={table}
        filterKey="name"
        filterPlaceholder="Filtrar por título..."
        mappedView={{
          name: 'Título',
          description: 'Descrição',
          totalAmount: 'Quantidade Total',
          loanAmount: 'Quantidade Emprestáda',
          availableAmount: 'Quantidade Disponível',
        }}
      />
      <Table.Content
        table={table}
        columnsLength={columns.length}
        placeholder="Nenhuma conta encontrada."
      />
      <Table.Footer pagination={pagination} />

      <Table.DeleteDialog
        title="Tem certeza que deseja excluir esse livro?"
        subtitle="Essa ação não poderá ser desfeita. Isso excluirá esse livro permanentemente."
        onConfirm={() => deleteBook({ bookId: selectedId! })}
      />

      <Table.EditDialog
        title="Editar livro"
        subtitle="Edite os dados do livro"
      >
        <BookForm onSubmit={handleUpdateBook} submitLabel="Editar livro" initialValues={initialValues} />
      </Table.EditDialog>
    </div>
  )
}
