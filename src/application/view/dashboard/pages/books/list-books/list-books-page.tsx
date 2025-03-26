import { Table } from "@/application/shared/components/table";
import { CreateBookButton } from "./components/create-book-button";
import { ListBooksContent } from "./list-books-content";

export const ListBooksPage: React.FC = () => {
   return (
    <Table.Wrapper
      title="Livros"
      subtitle="Lista de todos os livros da biblioteca."
      renderAddButton={() => <CreateBookButton />}
    >
      <ListBooksContent />
    </Table.Wrapper>
  );
}
