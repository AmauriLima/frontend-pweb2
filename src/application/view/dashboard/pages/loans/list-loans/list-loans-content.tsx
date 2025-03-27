import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/application/shared/components/ui/alert-dialog";

import { useCloseLoan } from "@/application/modules/loans/hooks/use-close-loan";
import { useTable } from "@/application/shared/contexts/table-context";
import { LoansTable } from "./components/loans-table";

export function ListLoansContent() {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen, selectedId } = useTable();
  const { closeLoan } = useCloseLoan();

  function handleCloseLoan() {
    closeLoan(selectedId!)
  }

  return (
    <>
      <LoansTable  />

      <AlertDialog onOpenChange={setIsDeleteDialogOpen} open={isDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja encerrar esse empréstimo?</AlertDialogTitle>
            <AlertDialogDescription>
              O empréstimo será considerado devolvido!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCloseLoan}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
