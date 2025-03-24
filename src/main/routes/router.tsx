
import { AuthLayout } from '@/application/view/auth/pages/layout';
import { SignInPage } from '@/application/view/auth/pages/sign-in/sign-in';
import { DashboardLayout } from '@/application/view/dashboard/layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthRoute } from './auth-route';
import { ProtectedRoute } from './protected-route';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

        <Route element={<AuthRoute />}>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<h1>Sign up</h1>} />
          </Route>
        </Route>

        <Route path="dashboard" element={<DashboardLayout />} >
          <Route path="accounts" element={<ProtectedRoute />}>
            <Route path="" element={<h1>Usuários</h1>} />
            <Route path="create-account" element={<h1>Adicionar usuário</h1>} />
          </Route>

          <Route path="books" element={<ProtectedRoute />}>
            <Route path="" element={<h1>Livros</h1>} />
            <Route path="create-book" element={<h1>Adicionar livro</h1>} />
          </Route>

          <Route path="loans" element={<ProtectedRoute />}>
            <Route path="" element={<h1>Empréstimos</h1>} />
            <Route path="create-loan" element={<h1>Criar empréstimo</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
