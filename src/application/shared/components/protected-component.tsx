import { useMe } from "@/application/modules/account/hooks/use-me";
import { Roles } from "@/application/modules/account/services/dto/account-dto";

interface IProps {
  rolesAllowed?: Roles[];
  children: React.ReactNode;
}

export function ProtectedComponent({ rolesAllowed, children }: IProps) {
  const { profile, isLoading } = useMe();

  if (
    !isLoading &&
    (!profile || profile.roleCode && rolesAllowed && !rolesAllowed?.includes(profile.roleCode))
  ) {
    return null;
  }

  return children;
}
