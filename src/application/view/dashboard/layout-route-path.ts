export const routePath: { [key: string]: { label: string, route?: string } } = {
  'dashboard': {
    label: 'Dashboard'
  },
  'accounts': {
    label: 'Usuários',
    route: '/dashboard/accounts'
  },
  'create-account': {
    label: 'Criar usuário',
    route: '/dashboard/accounts/create-account'
  },
  'books': {
    label: 'Livros',
    route: '/dashboard/books'
  },
  'create-book': {
    label: 'Adicionar livro',
    route: '/dashboard/books/create-book'
  },
  'loans': {
    label: 'Empréstimos',
    route: '/dashboard/loans'
  },
  'create-loan': {
    label: 'Criar empréstimo',
    route: '/dashboard/loans/create-loan'
  },
};
