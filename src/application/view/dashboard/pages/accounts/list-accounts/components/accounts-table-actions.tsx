import { Account } from "@/application/modules/account/services/dto/account-dto";
import { Button } from "@/application/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { useTable } from "@/application/shared/contexts/table-context";
import { LucideBookOpen, LucideCopy, LucidePencil, LucideTrash2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Props {
  account: Account;
}

export const AccountsTableActions: React.FC<Props> = ({ account }) => {
  const navigate = useNavigate();

  const { setIsDeleteDialogOpen, setIsEditDialogOpen, setSelectedId } = useTable();

  function handleEdit() {
    setSelectedId(account.id);
    setIsEditDialogOpen(true)
  }

  function handleDelete() {
    setSelectedId(account.id);
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
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(account.email)
              toast.success('E-mail copiado para área de transferência');
            }}
          >
            <LucideCopy />
            Copiar e-mail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/dashboard/loans/${account.id}`)}
          >
            <LucideBookOpen />
            Ver empréstimos
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            <DropdownMenuItem variant="default" onClick={handleEdit}>
              <LucidePencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <LucideTrash2 />
              Remover
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
