import { Book } from "@/application/modules/books/services/dto/book-dto";
import { Button } from "@/application/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { useTable } from "@/application/shared/contexts/table-context";
import { LucideBookOpen, LucidePencil, LucideTrash2, MoreHorizontal } from "lucide-react";

interface Props {
  book: Book;
}

export const BooksTableActions: React.FC<Props> = ({ book }) => {
  const { setIsDeleteDialogOpen, setIsEditDialogOpen, setSelectedId } = useTable();

  function handleEdit() {
    setSelectedId(book.id);
    setIsEditDialogOpen(true)
  }

  function handleDelete() {
    setSelectedId(book.id);
    setIsDeleteDialogOpen(true)
  }

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
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem variant="default" onClick={() => alert('Direcionar para emprestimo')}>
            <LucideBookOpen />
            Emprestar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="default" onClick={handleEdit}>
            <LucidePencil />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <LucideTrash2 />
            Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
