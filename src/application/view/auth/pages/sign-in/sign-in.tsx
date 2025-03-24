
import { useSignIn } from "@/application/modules/auth/hooks/use-sign-in";
import { SignInDTO, signInDTO } from "@/application/modules/auth/services/dto/account-dto";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer, FormHeader, FormSubtitle, FormTitle, FormWrapper } from '../../components/form';


export const SignInPage: React.FC = () => {
  const { signIn } = useSignIn();
  const form = useForm<SignInDTO>({
    resolver: zodResolver(signInDTO)
  });

  const { formState: { isValid, isSubmitted } } = form;

  const handleSubmit: SubmitHandler<SignInDTO> = async (dto) => {
    signIn(dto);
  }

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>Entre em sua conta</FormTitle>
        <FormSubtitle
          text="Novo por aqui?"
          span="Crie uma conta"
          to="/auth/sign-up"
        />
      </FormHeader>

      <Form {...form}>
        <FormWrapper
          onSubmit={form.handleSubmit(handleSubmit)}
          buttonLabel="Entrar"
          disabled={!isValid && isSubmitted}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormWrapper>
      </Form>
    </FormContainer>
  );
};
