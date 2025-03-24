import { LucideBook, LucideUser2 } from "lucide-react";
import { CollapsibleItem } from "./components/app-sidebar";

export const collapsibleItems: CollapsibleItem[] = [
  {
    title: 'Usuários',
    url: '/dashboard/accounts',
    icon: LucideUser2,
    isActive: true,
    items: [
      {
        title: 'Todos os usuários',
        url: '/dashboard/accounts'
      },
      {
        title: 'Adicionar usuário',
        url: '/dashboard/accounts/create-account'
      },
    ]
  },
  {
    title: 'Livros',
    url: '/dashboard/books',
    icon: LucideBook,
    isActive: true,
    items: [
      {
        title: 'Todos os livros',
        url: '/dashboard/books'
      },
      {
        title: 'Adicionar livro',
        url: '/dashboard/books/create-book'
      },
    ]
  },
  {
    title: 'Empréstimos',
    url: '/dashboard/loans',
    icon: LucideUser2,
    isActive: true,
    items: [
      {
        title: 'Todos os empréstimos',
        url: '/dashboard/loans'
      },
      {
        title: 'Criar empréstimo',
        url: '/dashboard/loans/create-loan'
      },
    ]
  }
];
