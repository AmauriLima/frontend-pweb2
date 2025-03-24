import { Roles } from '@/application/modules/account/services/dto/account-dto';
import { AuthLayout } from '@/application/view/auth/pages/layout';
import { SignInPage } from '@/application/view/auth/pages/sign-in/sign-in';
import { CreateAccoutPage } from '@/application/view/dashboard/pages/accounts/create-account/create-account-page';
import { ListAccoutsPage } from '@/application/view/dashboard/pages/accounts/list-accounts/list-accounts-page';
import { CreateBookPage } from '@/application/view/dashboard/pages/books/create-book/create-book-page';
import { ListBooksPage } from '@/application/view/dashboard/pages/books/list-books/list-books-page';
import { DashboardLayout } from '@/application/view/dashboard/pages/layout';
import { CreateLoanPage } from '@/application/view/dashboard/pages/loans/create-loan/create-loan-page';
import { ListLoansPage } from '@/application/view/dashboard/pages/loans/list-loans/list-loans-page';
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
          <Route path="accounts" element={<ProtectedRoute rolesAllowed={[Roles.ADMIN, Roles.MANAGER, Roles.USER_MANAGER]} />}>
            <Route path="" element={<ListAccoutsPage />} />
            <Route path="create-account" element={<CreateAccoutPage />} />
          </Route>

          <Route path="books" element={<ProtectedRoute rolesAllowed={[Roles.ADMIN, Roles.MANAGER, Roles.BOOK_MANAGER]} />}>
            <Route path="" element={<ListBooksPage />} />
            <Route path="create-book" element={<CreateBookPage />} />
          </Route>

          <Route path="loans" element={<ProtectedRoute rolesAllowed={[Roles.ADMIN, Roles.MANAGER, Roles.USER_MANAGER]} />}>
            <Route path="" element={<ListLoansPage />} />
            <Route path="create-loan" element={<CreateLoanPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
