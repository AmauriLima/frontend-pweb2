import { useMe } from "@/application/modules/account/hooks/use-me";
import { Roles } from "@/application/modules/account/services/dto/account-dto";

import { Navigate, Outlet } from "react-router";

interface IProps {
  rolesAllowed?: Roles[];
}

export function AuthRoute({ rolesAllowed }: IProps) {
  const { profile, isLoading } = useMe();

  if (
    !isLoading &&
    (profile && profile.roleCode && rolesAllowed && rolesAllowed?.includes(profile.roleCode))
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
