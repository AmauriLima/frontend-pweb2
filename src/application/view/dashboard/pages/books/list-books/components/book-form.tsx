
import { createBookDTO, CreateBookDTO, updateBookDTO, UpdateBookDTO } from "@/application/modules/books/services/dto/book-dto";
import { Button } from "@/application/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { Textarea } from "@/application/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  onSubmit(dto: CreateBookDTO | UpdateBookDTO): Promise<void>;
  submitLabel: string;
  initialValues?: UpdateBookDTO;
}

export const BookForm: React.FC<Props> = ({ onSubmit, submitLabel, initialValues }) => {
  const isEditing = !!initialValues;

  const form = useForm<CreateBookDTO | UpdateBookDTO>({
    resolver: zodResolver(isEditing ? updateBookDTO : createBookDTO),
    defaultValues: initialValues,
  });

  const { formState: { isValid, isDirty, isSubmitted } } = form;

  const handleSubmit: SubmitHandler<CreateBookDTO | UpdateBookDTO> = async (dto) => {
    await onSubmit(dto);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-8" autoComplete="off">
        <div className="space-y-4">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input autoComplete="new-name" placeholder="Título..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea autoSave="off" autoComplete="new-text" placeholder="Descrição do livro..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url da Capa</FormLabel>
                <FormControl>
                  <Input autoSave="off" autoComplete="new-cover" placeholder="https://www.img.com.br/img" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input autoSave="off" autoComplete="new-cover" placeholder="Quantidade de livros" {...field} />
                </FormControl>
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
