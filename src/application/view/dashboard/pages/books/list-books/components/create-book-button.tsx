import { Button } from "@/application/shared/components/ui/button";
import { useTable } from "@/application/shared/contexts/table-context";
import { LucideBookPlus } from "lucide-react";

export function CreateBookButton() {
  const { setIsAddDialogOpen } = useTable();

  return (
    <Button onClick={() => setIsAddDialogOpen(true)}>
      <LucideBookPlus />
      Adicionar Livro
    </Button>
  )
}
