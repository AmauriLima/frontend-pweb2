import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { usePagination } from '@/application/shared/hooks/use-pagination';
import { makeLoansService } from '../services/make-loans-service';

interface UseGetLoansProps {
  accountId?: string;
  perPage?: number;
}

export function useGetLoans({ accountId, perPage = 10 }: UseGetLoansProps) {
  const loansService = makeLoansService();
  const pagination = usePagination(perPage);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ['loans', { page: pagination.currentPage, perPage, accountId }],
    queryFn: async () => {
      const response = await loansService.getLoans({
        page: pagination.currentPage,
        perPage,
        accountId,
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
        queryKey: ['loans', { page: nextPage, perPage }],
        queryFn: async () => {
          const response = await loansService.getLoans({ page: nextPage, perPage, accountId });

          pagination.setTotalItems(response.data.totalItems);

          return response;
        },
      });
    }
  }, [pagination.currentPage, pagination.hasNextPage, perPage, accountId]);

  return {
    loans: data?.data.data ?? [],
    isLoading,
    pagination,
  };
}
