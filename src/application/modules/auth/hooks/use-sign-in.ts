import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Roles } from "../../account/services/dto/account-dto";
import { makeAuthService } from "../services/make-auth-service";
import { SignInDTO, SignInResponse } from "../services/dto/auth-dto";

export function useSignIn() {
  const authService = makeAuthService();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<SignInResponse>, Error, SignInDTO>({
    mutationFn: authService.signIn.bind(authService),
    onSuccess: (response) => {
      const { accessToken, role } = response.data;
      authService.setToken({ accessToken, role });

      const entryRoute = '/dashboard';

      navigate(entryRoute);
    },
    onError: () => toast.error('Credenciais inválidas')
  });

  return {
    signIn: mutateAsync,
    isLoading: isPending,
  }
}
