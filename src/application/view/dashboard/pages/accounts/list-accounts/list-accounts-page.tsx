import { Table } from "@/application/shared/components/table";
import { Button } from "@/application/shared/components/ui/button";
import { LucideUserPlus2 } from "lucide-react";
import { AccountsTable } from "./components/accounts-table";

export const ListAccoutsPage: React.FC = () => {
  return (
    <Table.Wrapper
      title="Usuários"
      subtitle="Lista de todos os usuários cadastrados."
      renderAddButton={() => (
        <Button>
          <LucideUserPlus2 />
          Adicionar usuário
        </Button>
      )}
    >
      <AccountsTable />
    </Table.Wrapper>
  );
}
