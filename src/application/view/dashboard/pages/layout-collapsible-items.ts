import { Roles } from "@/application/modules/account/services/dto/account-dto";
import { LucideBookOpen, LucideLibraryBig, LucideUser2 } from "lucide-react";
import { CollapsibleItem } from "../components/app-sidebar";

export const collapsibleItems: CollapsibleItem[] = [
  {
    title: 'Usuários',
    url: '/dashboard/accounts',
    icon: LucideUser2,
    isActive: true,
    rolesAllowed: [Roles.ADMIN, Roles.MANAGER, Roles.USER_MANAGER],
    items: [
      {
        title: 'Todos os usuários',
        url: '/dashboard/accounts'
      }
    ]
  },
  {
    title: 'Livros',
    url: '/dashboard/books',
    icon: LucideLibraryBig,
    isActive: true,
    rolesAllowed: [Roles.ADMIN, Roles.MANAGER, Roles.BOOK_MANAGER, Roles.USER_MANAGER, Roles.USER],
    items: [
      {
        title: 'Todos os livros',
        url: '/dashboard/books',
      },
    ]
  },
  {
    title: 'Empréstimos',
    url: '/dashboard/loans',
    icon: LucideBookOpen,
    isActive: true,
    rolesAllowed: [Roles.ADMIN, Roles.MANAGER, Roles.USER_MANAGER],
    items: [
      {
        title: 'Todos os empréstimos',
        url: '/dashboard/loans'
      }
    ]
  },
  {
    title: 'Meus empréstimos',
    url: '/dashboard/loans/me',
    icon: LucideBookOpen,
    isActive: true,
    rolesAllowed: [Roles.USER],

    items: [
      {
        title: 'Meus empréstimos',
        url: '/dashboard/loans/me'
      }
    ]
  }
];
