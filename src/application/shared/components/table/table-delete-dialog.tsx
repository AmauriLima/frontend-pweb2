import { AxiosResponse } from "axios";
import { useTable } from "../../contexts/table-context";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { buttonVariants } from "../ui/button";

interface Props {
  title: string;
  subtitle: string;
  onConfirm(): Promise<AxiosResponse<void>>;
}

export const TableDeleteDialog: React.FC<Props> = ({ title, subtitle, onConfirm }) => {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen } = useTable();

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {subtitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={onConfirm}>
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
