import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { usePagination } from '@/application/shared/hooks/use-pagination';
import { makeBooksService } from '../services/make-books-service';

export function useGetBooks(perPage = 10) {
  const booksService = makeBooksService();
  const pagination = usePagination(perPage);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ['books', { page: pagination.currentPage, perPage }],
    queryFn: async () => {
      const response = await booksService.getBooks({
        page: pagination.currentPage,
        perPage,
      });

      pagination.setTotalItems(response.data.totalItems);

      return response;
    },
  });

  useEffect(() => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.currentPage + 1;

      queryClient.prefetchQuery({
        staleTime: Infinity,
        queryKey: ['books', { page: nextPage, perPage }],
        queryFn: async () => {
          const response = await booksService.getBooks({ page: nextPage, perPage});

          pagination.setTotalItems(response.data.totalItems);

          return response;
        },
      });
    }
  }, [pagination.currentPage, pagination.hasNextPage, perPage]);

  return {
    books: data?.data.data ?? [],
    isLoading,
    pagination,
  };
}
