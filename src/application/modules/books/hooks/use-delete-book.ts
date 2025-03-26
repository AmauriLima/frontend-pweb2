import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HttpAxiosError } from '@/application/shared/clients/http-client';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { makeBooksService } from '../services/make-books-service';

interface DeleteBookParams {
  bookId: string;
}

export function useDeleteBook() {
  const booksService = makeBooksService();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<void>, HttpAxiosError, DeleteBookParams>({
    mutationFn: async ({ bookId }) => booksService.deleteBook(bookId),
    onSuccess: () => {
      toast.success('Livro removido com sucesso');
      queryClient.invalidateQueries({
        queryKey: ['books']
      });
    },
    onError: (error) => {
      toast.error(error.response?.data.messages);
    }
  });

  return {
    deleteBook: mutateAsync,
    isLoading: isPending,
  };
}
