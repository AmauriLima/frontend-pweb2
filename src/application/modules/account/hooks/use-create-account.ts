import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HttpAxiosError } from '@/application/shared/clients/http-client';
import { toast } from 'sonner';
import { makeAccountService } from '../services/make-account-service';

export function useCreateAccount() {
  const accountsService = makeAccountService();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: accountsService.createAccount.bind(accountsService),
    onSuccess: () => {
      toast.success('Conta criada com sucesso');

      queryClient.invalidateQueries({
        queryKey: ['accounts']
      });
    },
    onError: (err) => {
      const error = err as HttpAxiosError;
      toast.error(error.response?.data.messages[0]);
    }
  });

  return {
    createAccount: mutateAsync,
    isLoading: isPending,
  };
}
