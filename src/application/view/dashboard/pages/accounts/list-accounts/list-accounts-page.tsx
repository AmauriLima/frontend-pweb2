import { Button } from "@/application/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/application/shared/components/ui/card";
import { LucideUserPlus2 } from "lucide-react";
import { AccountsTable } from "./components/accounts-table";

export const ListAccoutsPage: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Lista de todos os usuários cadastrados.</CardDescription>
        </div>

        <Button>
          <LucideUserPlus2 />
          Adicionar usuário
        </Button>
      </CardHeader>
      <CardContent>
        <AccountsTable />
      </CardContent>
    </Card>
  );
}
