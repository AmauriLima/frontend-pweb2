import { useGetAccounts } from "@/application/modules/account/hooks/use-get-accounts";

import { useDeleteAccount } from "@/application/modules/account/hooks/use-delete-account";
import { useUpdateAccount } from "@/application/modules/account/hooks/use-update-account";
import { UpdateAccountDTO } from "@/application/modules/account/services/dto/account-dto";
import { Table } from "@/application/shared/components/table";
import { useTable } from "@/application/shared/contexts/table-context";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from 'react';
import { AccountsForm } from "./accounts-form";
import { columns } from "./accounts-table-columns";

export function AccountsTable() {
  const { accounts, pagination } = useGetAccounts();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const table = useReactTable({
    data: accounts,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const { selectedId, setIsEditDialogOpen } = useTable();
  const initialValues = useMemo(() => accounts.find((account) => account.id === selectedId), [accounts, selectedId]);

  const { deleteAccount } = useDeleteAccount();

  const { updateAccount } = useUpdateAccount();

  async function handleUpdateAcount(dto: UpdateAccountDTO) {
    await updateAccount({ dto, accountId: selectedId! });

    setIsEditDialogOpen(false);
  }

  return (
    <div>
      <Table.Toolkit
        table={table}
        filterKey="email"
        filterPlaceholder="Filtrar por e-mail..."
        mappedView={{
          name: 'Nome',
          email: 'Email',
          roleCode: 'Função',
        }}
      />
      <Table.Content
        table={table}
        columnsLength={columns.length}
        placeholder="Nenhuma conta encontrada."
      />
      <Table.Footer pagination={pagination} />

      <Table.DeleteDialog
        title="Tem certeza que deseja excluir esse usuário?"
        subtitle="Essa ação não poderá ser desfeita. Isso excluirá esse usuário permanentemente."
        onConfirm={() => deleteAccount({ accountId: selectedId! })}
      />

      <Table.EditDialog
        title="Editar usuário"
        subtitle="Edite os dados cadastrais do usuário"
      >
        <AccountsForm onSubmit={handleUpdateAcount} submitLabel="Editar usuário" initialValues={initialValues} />
      </Table.EditDialog>
    </div>
  )
}
