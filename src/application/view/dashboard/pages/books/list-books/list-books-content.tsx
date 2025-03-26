import { useCreateBook } from "@/application/modules/books/hooks/use-create-book";
import { CreateBookDTO } from "@/application/modules/books/services/dto/book-dto";
import { Table } from "@/application/shared/components/table";
import { useTable } from "@/application/shared/contexts/table-context";
import { BookForm } from "./components/book-form";
import { BooksTable } from "./components/books-table";

export function ListBooksContent() {
  const { setIsAddDialogOpen } = useTable();
  const { createBook } = useCreateBook();

  async function handleCreateBook(dto: CreateBookDTO) {
    await createBook(dto);

    setIsAddDialogOpen(false);
  }

  return (
    <>
      <BooksTable />

      <Table.AddDialog
        title="Adicionar um livro"
        subtitle="Adicione um novo livro na biblioteca"
      >
        <BookForm onSubmit={handleCreateBook} submitLabel="Adicionar livro" />
      </Table.AddDialog>
    </>
  );
}
