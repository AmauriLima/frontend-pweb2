import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { usePagination } from '@/application/shared/hooks/use-pagination';
import { makeAccountService } from '../services/make-account-service';

export function useGetAccounts(perPage = 10) {
  const accountsService = makeAccountService();
  const pagination = usePagination(perPage);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ['accounts', { page: pagination.currentPage, perPage }],
    queryFn: async () => {
      const response = await accountsService.getAccounts({
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
        queryKey: ['accounts', { page: nextPage, perPage }],
        queryFn: async () => {
          const response = await accountsService.getAccounts({ page: nextPage, perPage});

          pagination.setTotalItems(response.data.totalItems);

          return response;
        },
      });
    }
  }, [pagination.currentPage, pagination.hasNextPage, perPage]);

  return {
    accounts: data?.data.data ?? [],
    isLoading,
    pagination,
  };
}
