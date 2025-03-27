import { z } from "zod";

export interface Loan {
  id: string;
  account: {
    id: string;
    name: string;
  };
  book: {
    id: string;
    name: string;
  };
  dueDate: Date;
  returnDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetLoansResponse {
  data: Loan[];
  totalItems: number;
}

export const createLoanDTO = z.object({
  accountEmail: z.string().email(),
  bookId: z.string().uuid(),
  dueDate: z.string().datetime(),
});
export type CreateLoanDTO = z.infer<typeof createLoanDTO>;
export type CreateLoanResponse = Loan;

export type CloseLoanResponse = Loan;
