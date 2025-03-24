import { Button } from "@/application/shared/components/ui/button";
import { Link } from "react-router";

interface IChildren {
  children: React.ReactNode;
}

function FormTitle({ children }: IChildren) {
  return <h1 className="text-2xl tracking-tight font-bold">{children}</h1>
}

interface IFormSubtitle  {
  text: string;
  span: string;
  to: string;
}

function FormSubtitle({ span, text, to }: IFormSubtitle) {
  return (
    <h2 className="text-muted-foreground tracking-tighter gap-2 flex">
      {text}
      <Link className="text-primary" to={to}>{span}</Link>
    </h2>
  )
}

function FormHeader({ children}: IChildren) {
  return (
    <div className="flex flex-col justify-center items-center space-y-1">
      {children}
    </div>
  )
}


function FormContainer({ children }: IChildren) {
  return (
    <div className="w-full border-2 border-solid border-gray-500/10 rounded-2xl p-6 shadow-md">
      {children}
    </div>
  )
}

interface IFormWrapperProps extends React.FormHTMLAttributes<HTMLFormElement> {
  buttonLabel: string;
  disabled: boolean
}

function FormWrapper({ children, buttonLabel, disabled, ...props }: IFormWrapperProps) {
  return (
    <form className="w-full space-y-8 mt-8" {...props}>
      <div className="space-y-4">
        {children}
      </div>

      <Button type="submit" disabled={disabled} className="w-full">{buttonLabel}</Button>
    </form>
  )
}

export {
  FormContainer, FormHeader, FormSubtitle, FormTitle, FormWrapper
};

