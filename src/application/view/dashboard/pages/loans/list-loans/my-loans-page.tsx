import { Table } from "@/application/shared/components/table";
import { MyLoansContent } from "./my-loans-content";


export const MyLoansPage: React.FC = () => {
    return (
        <Table.Wrapper
            title="Meus Empréstimos"
            subtitle="Todos os seus empréstimos ativos."
        >
            <MyLoansContent />
        </Table.Wrapper>
    );
}