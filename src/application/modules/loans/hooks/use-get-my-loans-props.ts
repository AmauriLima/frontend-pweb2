import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { usePagination } from '@/application/shared/hooks/use-pagination';
import { makeLoansService } from '../services/make-loans-service';

interface UseGetMyLoansProps {
    perPage?: number;
}

export function useGetMyLoans({ perPage = 10 }: UseGetMyLoansProps = {}) {
    const loansService = makeLoansService();
    const pagination = usePagination(perPage);

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        staleTime: Infinity,
        queryKey: ['myLoans', { page: pagination.currentPage, perPage }],
        queryFn: async () => {
            const response = await loansService.getMyLoans({
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
                queryKey: ['myLoans', { page: nextPage, perPage }],
                queryFn: async () => {
                    const response = await loansService.getMyLoans({
                        page: nextPage,
                        perPage,
                    });

                    pagination.setTotalItems(response.data.totalItems);

                    return response;
                },
            });
        }
    }, [pagination.currentPage, pagination.hasNextPage, perPage]);

    return {
        loans: data?.data.data ?? [],
        isLoading,
        pagination,
    };
}