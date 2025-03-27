import { Table } from "@/application/shared/components/table";
import { ListLoansContent } from "./list-loans-content";

export const ListLoansPage: React.FC = () => {
  return (
    <Table.Wrapper
      title="Empréstimos"
      subtitle="Todos os empréstimos da biblioteca."
    >
      <ListLoansContent />
    </Table.Wrapper>
  );
}
