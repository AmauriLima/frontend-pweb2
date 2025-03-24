import { AuthLayout } from '@/application/modules/auth/pages/layout';
import { SignInPage } from '@/application/modules/auth/pages/sign-in/sign-in';
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

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
