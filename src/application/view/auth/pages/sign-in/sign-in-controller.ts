import { useSignIn } from "@/application/modules/auth/hooks/use-sign-in";
import { SignInDTO, signInDTO } from "@/application/modules/auth/services/dto/auth-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export function useSignInController() {
  const { signIn } = useSignIn();
  const form = useForm<SignInDTO>({
    resolver: zodResolver(signInDTO)
  });

  const { formState: { isValid, isSubmitted } } = form;

  const handleSubmit: SubmitHandler<SignInDTO> = async (dto) => {
    signIn(dto);
  }

  return {
    form,
    handleSubmit,
    isValid,
    isSubmitted
  }
}
