import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/application/shared/components/ui/card";
import { TableProvider } from "../../contexts/table-context";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  renderAddButton?: () => React.ReactNode;
}

export const TableWrapper: React.FC<Props> = (props) => {
  const { title, subtitle, children, renderAddButton } = props;

  return (
    <TableProvider>
      <Card className="max-w-7xl">
        <CardHeader className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>

          {renderAddButton?.()}
        </CardHeader>
        <CardContent>
          <div className="w-full">
            {children}
          </div>
        </CardContent>
      </Card>
    </TableProvider>
  )
};
