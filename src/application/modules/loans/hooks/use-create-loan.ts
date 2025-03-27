import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HttpAxiosError } from '@/application/shared/clients/http-client';
import { toast } from 'sonner';
import { makeLoansService } from '../services/make-loans-service';

export function useCreateLoan() {
  const loansService = makeLoansService();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loansService.createLoan.bind(loansService),
    onSuccess: () => {
      toast.success('Empréstimo criado com sucesso');

      queryClient.invalidateQueries({
        queryKey: ['loans']
      });
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
    createLoan: mutateAsync,
    isLoading: isPending,
  };
}
