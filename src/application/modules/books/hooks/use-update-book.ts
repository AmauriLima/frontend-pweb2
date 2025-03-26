import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HttpAxiosError } from '@/application/shared/clients/http-client';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';

import { UpdateBookDTO, UpdateBookResponse } from '../services/dto/book-dto';
import { makeBooksService } from '../services/make-books-service';

interface UpdateBookParams {
  dto: UpdateBookDTO;
  bookId: string;
}

export function useUpdateBook() {
  const booksService = makeBooksService();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<UpdateBookResponse>, HttpAxiosError, UpdateBookParams>({
    mutationFn: async ({ dto, bookId }) => booksService.updateBook(dto, bookId),
    onSuccess: () => {
      toast.success('Livro atualizado com sucesso');

      queryClient.invalidateQueries({
        queryKey: ['books']
      });
    },
    onError: (error) => {
      toast.error(error.response?.data.messages);
    }
  });

  return {
    updateBook: mutateAsync,
    isLoading: isPending,
  };
}
