import { Roles } from "@/application/modules/account/services/dto/account-dto";
import { ProtectedComponent } from "@/application/shared/components/protected-component";
import { Button } from "@/application/shared/components/ui/button";
import { useTable } from "@/application/shared/contexts/table-context";
import { LucideBookPlus } from "lucide-react";

export function CreateBookButton() {
  const { setIsAddDialogOpen } = useTable();

  return (
    <ProtectedComponent rolesAllowed={[Roles.ADMIN, Roles.MANAGER, Roles.BOOK_MANAGER]}>
      <Button onClick={() => setIsAddDialogOpen(true)}>
        <LucideBookPlus />
        Adicionar Livro
      </Button>
    </ProtectedComponent>
  )
}
