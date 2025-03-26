import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HttpAxiosError } from '@/application/shared/clients/http-client';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { CloseLoanResponse } from '../services/dto/loans-dto';
import { makeLoansService } from '../services/make-loans-service';

export function useCloseLoan() {
  const loanService = makeLoansService();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<CloseLoanResponse>, HttpAxiosError, string>({
    mutationFn: async (loanId) => loanService.closeLoan(loanId),
    onSuccess: () => {
      toast.success('Empréstimo recebido com sucesso');

      queryClient.invalidateQueries({
        queryKey: ['loans']
      });
    },
    onError: (error) => {
      toast.error(error.response?.data.messages);
    }
  });

  return {
    closeLoan: mutateAsync,
    isLoading: isPending,
  };
}
