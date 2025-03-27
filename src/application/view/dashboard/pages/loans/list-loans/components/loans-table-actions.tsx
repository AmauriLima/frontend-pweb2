import { Loan } from "@/application/modules/loans/services/dto/loans-dto";
import { Button } from "@/application/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { useTable } from "@/application/shared/contexts/table-context";
import { LucideFolderClosed, MoreHorizontal } from "lucide-react";

interface Props {
  loan: Loan;
}

export const LoansTableActions: React.FC<Props> = ({ loan }) => {
  const { setIsDeleteDialogOpen, setSelectedId } = useTable();

  function handleCloseLoan() {
    setSelectedId(loan.id);
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
          <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCloseLoan}>
              <LucideFolderClosed />
              Encerrar empréstimo
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
