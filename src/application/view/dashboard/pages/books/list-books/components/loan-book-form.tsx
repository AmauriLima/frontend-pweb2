
import { createLoanDTO, CreateLoanDTO } from "@/application/modules/loans/services/dto/loans-dto";
import { Button } from "@/application/shared/components/ui/button";
import { Calendar } from "@/application/shared/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/application/shared/components/ui/popover";
import { useTable } from "@/application/shared/contexts/table-context";
import { cn } from "@/application/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  onSubmit(dto: CreateLoanDTO): Promise<void>;
  submitLabel: string;
}

export const LoanBookForm: React.FC<Props> = ({ onSubmit, submitLabel }) => {
  const { selectedId } = useTable();

  const form = useForm<CreateLoanDTO>({
    resolver: zodResolver(createLoanDTO),
    defaultValues: {
      bookId: selectedId!,
    }
  });

  const { formState: { isValid, isDirty, isSubmitted } } = form;

  const handleSubmit: SubmitHandler<CreateLoanDTO> = async (dto) => {
    console.log('fui chamado?')
    await onSubmit(dto);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-8" autoComplete="off">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="accountEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail do usuário</FormLabel>
                <FormControl>
                  <Input autoComplete="new-name" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de devolução</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: ptBR
                        })
                      ) : (
                        <span>Escolha a data de devolução</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(a) => {
                      field.onChange(a?.toISOString())
                    }}
                    locale={ptBR}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                O prazo limite para devolução desse empréstimo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <Button type="submit" disabled={(isSubmitted && !isValid) || !isDirty} className="w-full">{submitLabel}</Button>
      </form>
    </Form>
  );
};
