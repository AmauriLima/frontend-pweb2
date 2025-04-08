import { Roles } from "@/application/modules/account/services/dto/account-dto";
import { Book } from "@/application/modules/books/services/dto/book-dto";
import { ProtectedComponent } from "@/application/shared/components/protected-component";
import { Button } from "@/application/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { useTable } from "@/application/shared/contexts/table-context";
import { LucideBookOpen, LucidePencil, LucideTrash2, MoreHorizontal } from "lucide-react";

interface Props {
  book: Book;
}

export const BooksTableActions: React.FC<Props> = ({ book }) => {
  const { setIsDeleteDialogOpen, setIsEditDialogOpen, setSelectedId, handleCustomModalOpen } = useTable();

  function handleEdit() {
    setSelectedId(book.id);
    setIsEditDialogOpen(true)
  }

  function handleDelete() {
    setSelectedId(book.id);
    setIsDeleteDialogOpen(true)
  }

  function handleLoan() {
    setSelectedId(book.id);
    handleCustomModalOpen('loan', true)
  }

  return (
    <div className={`flex justify-end`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <ProtectedComponent rolesAllowed={[Roles.ADMIN, Roles.MANAGER, Roles.USER_MANAGER]}>
            <DropdownMenuItem variant="default" onClick={handleLoan}>
              <LucideBookOpen />
              Emprestar
            </DropdownMenuItem>
          </ProtectedComponent>
          <ProtectedComponent rolesAllowed={[Roles.ADMIN, Roles.MANAGER, Roles.BOOK_MANAGER]}>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="default" onClick={handleEdit}>
              <LucidePencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <LucideTrash2 />
              Remover
            </DropdownMenuItem>
          </ProtectedComponent>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
