import { Roles } from "@/application/modules/account/services/dto/account-dto";

export interface IRoutePath {
  label: string;
  route?: string;
  allowedRoles?: Roles[];
}

export const routePath: Record<string, IRoutePath> = {
  'dashboard': {
    label: 'Dashboard',
    route: '/dashboard'
  },
  'accounts': {
    label: 'Usuários',
    route: '/dashboard/accounts'
  },
  'books': {
    label: 'Livros',
    route: '/dashboard/books'
  },
  'loans': {
    label: 'Empréstimos',
    route: '/dashboard/loans',
    allowedRoles: [Roles.ADMIN, Roles.USER_MANAGER, Roles.MANAGER,]
  },
  'me': {
    label: 'Meus Empréstimos',
    route: '/dashboard/loans/me'
  },
};
