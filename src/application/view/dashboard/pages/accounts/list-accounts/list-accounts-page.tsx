import { Table } from "@/application/shared/components/table";
import { CreateAccountButton } from "./components/create-account-button";
import { ListAccountsContent } from "./list-accounts-content";

export const ListAccoutsPage: React.FC = () => {
  return (
    <Table.Wrapper
      title="Usuários"
      subtitle="Lista de todos os usuários cadastrados."
      renderAddButton={() => <CreateAccountButton />}
    >
      <ListAccountsContent />
    </Table.Wrapper>
  );
}
