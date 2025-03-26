import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HttpAxiosError } from '@/application/shared/clients/http-client';
import { toast } from 'sonner';
import { makeBooksService } from '../services/make-books-service';

export function useCreateBook() {
  const booksService = makeBooksService();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: booksService.createBook.bind(booksService),
    onSuccess: () => {
      toast.success('Livro adicionado com sucesso');

      queryClient.invalidateQueries({
        queryKey: ['books']
      });
    },
    onError: (err) => {
      const error = err as HttpAxiosError;
      toast.error(error.response?.data.messages[0]);
    }
  });

  return {
    createBook: mutateAsync,
    isLoading: isPending,
  };
}
