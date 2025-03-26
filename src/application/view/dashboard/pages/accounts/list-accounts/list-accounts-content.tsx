import { useCreateAccount } from "@/application/modules/account/hooks/use-create-account";
import { CreateAccountDTO } from "@/application/modules/account/services/dto/account-dto";
import { Table } from "@/application/shared/components/table";
import { useTable } from "@/application/shared/contexts/table-context";
import { AccountsForm } from "./components/accounts-form";
import { AccountsTable } from "./components/accounts-table";

export function ListAccountsContent() {
  const { setIsAddDialogOpen } = useTable();
  const { createAccount } = useCreateAccount();

  async function handleCreateAccount(dto: CreateAccountDTO) {
    await createAccount(dto);

    setIsAddDialogOpen(false);
  }

  return (
    <>
      <AccountsTable />

      <Table.AddDialog
        title="Adicionar usuário"
        subtitle="Crie um novo usuário"
      >
        <AccountsForm onSubmit={handleCreateAccount} submitLabel="Adicionar usuário" />
      </Table.AddDialog>
    </>
  );
}
