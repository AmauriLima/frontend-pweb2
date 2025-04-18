import { Button } from "@/application/shared/components/ui/button";
import { useTable } from "@/application/shared/contexts/table-context";
import { LucideUserPlus2 } from "lucide-react";

export function CreateAccountButton() {
  const { setIsAddDialogOpen } = useTable();

  return (
    <Button onClick={() => setIsAddDialogOpen(true)}>
      <LucideUserPlus2 />
      Adicionar usuário
    </Button>
  )
}
