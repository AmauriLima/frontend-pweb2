import { useTable } from "../../contexts/table-context";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const TableFormAddDialog: React.FC<Props> = ({ title, subtitle, children }) => {
  const { isAddDialogOpen, setIsAddDialogOpen } = useTable();

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {subtitle}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
