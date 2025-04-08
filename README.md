
# 📚 Gerenciador de Biblioteca

**Alunos:** Amauri Pereira de Lima Júnior e Anderson de Lima Leite  
**Tipo de Projeto:** Aplicação Web SPA (Single Page Application)

## 🧾 1. Introdução

O **Gerenciador de Biblioteca** é uma aplicação web em formato de dashboard que permite o gerenciamento de usuários, livros e empréstimos, com base em um sistema de permissões (RBAC - Role-Based Access Control). O sistema apresenta diferentes níveis de acesso conforme o papel do usuário, garantindo segurança e flexibilidade no controle de funcionalidades.

---

## 🛠️ 2. Tecnologias Utilizadas

- **React** – Biblioteca principal para construção da interface.
- **Vite** – Ferramenta de build e desenvolvimento rápido.
- **Shadcn** – Componentes headless personalizáveis.
- **TailwindCSS** – Utilitário para estilização moderna e responsiva.
- **React Hook Form** – Manipulação e validação de formulários.
- **React Query** – Gerenciamento de cache e estado assíncrono.
- **Zod** – Validação de dados com schemas.
- **Axios** – Cliente HTTP para comunicação com a API.
- **React Router** – Roteamento entre páginas.

---

## 🗂️ 3. Estrutura do Projeto

```
src/
├── application/
│   ├── assets/
│   ├── modules/
│   │   ├── account/
│   │   │   ├── hooks/
│   │   │   └── services/dto/
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   └── services/dto/
│   │   ├── books/
│   │   │   ├── hooks/
│   │   │   └── services/dto/
│   │   └── loans/
│   │       ├── hooks/
│   │       └── services/dto/
│   ├── shared/
│   │   ├── clients/
│   │   ├── components/
│   │   │   ├── table/
│   │   │   └── ui/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   └── styles/
│   └── view/
│       ├── auth/
│       │   ├── components/
│       │   └── pages/sign-in/
│       └── dashboard/
│           ├── components/
│           └── pages/
│               ├── accounts/list-accounts/components/
│               ├── books/list-books/components/
│               └── loans/list-loans/components/
└── main/
    └── routes/
```

---

## 🎨 4. Design da Interface (UI/UX)

- **Prototipação:** Não foi utilizada ferramenta como Figma. A interface foi construída diretamente no código, com decisões tomadas a partir das necessidades do projeto.
- **Telas principais:**  
  _Inserir prints aqui caso desejado._

---

## 🧩 5. Componentização

- **Componentes reutilizáveis:**  
  Componentes como `Button`, `Input`, `Dialog`, entre outros, foram desenvolvidos com base no Shadcn e podem ser reutilizados em qualquer ponto do sistema (localizados em `/shared/components/ui`).

- **Tabela geral:**  
  Um componente genérico de tabela foi desenvolvido e adaptado para ser usado em diversas telas, incluindo funcionalidades como:
  - Filtros
  - Modais (criação, edição, exclusão)
  - Contextos compartilhados
  - Paginação e ordenação

- **Organização por domínio:**  
  A aplicação segue o padrão Presentational/Container. Toda lógica (hooks, validações, integrações) fica separada da parte visual, facilitando manutenção e escalabilidade.

---

## 🔐 6. Roteamento

As rotas da aplicação são organizadas por tipo de acesso e papel do usuário:

### Roteamento Público (Não autenticado):
- `/auth/sign-in` → Página de login
- `/auth/sign-up` → Página de cadastro (em construção)

### Roteamento Protegido (Usuários autenticados):
- `/dashboard` → Página inicial do painel
- `/dashboard/accounts` → Listagem de contas (requer permissão ADMIN, MANAGER ou USER_MANAGER)
- `/dashboard/books` → Listagem de livros (permite ADMIN, MANAGER, BOOK_MANAGER, USER_MANAGER, USER)
- `/dashboard/loans` → Listagem geral de empréstimos (ADMIN, MANAGER, USER_MANAGER)
- `/dashboard/loans/:accountId` → Empréstimos filtrados por conta
- `/dashboard/loans/me` → Meus empréstimos (apenas para usuários comuns)

### Controle de Acesso
Cada rota é envolvida por um componente `<ProtectedRoute />` que verifica o papel do usuário antes de permitir o acesso.

---

## 🌐 7. Integração com Backend

Todos os dados do sistema são consumidos a partir da API desenvolvida separadamente. A comunicação é feita via Axios com autenticação baseada em token JWT. Os dados trafegam com schemas validados utilizando Zod.

---

## ✅ 8. Considerações Finais

O projeto foi construído com foco em organização, escalabilidade e boas práticas modernas. A separação entre visualização e lógica, aliada ao uso de ferramentas como React Query e Zod, proporcionou uma base sólida para manutenção e futuras melhorias. A interface oferece uma experiência simples e funcional para diferentes perfis de usuário.
