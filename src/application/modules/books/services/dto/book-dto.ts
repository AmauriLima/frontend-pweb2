import { z } from "zod";

export interface Book {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  totalAmount: number;
  loanAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetBooksResponse {
  data: Book[];
  totalItems: number;
}

export const createBookDTO = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Nome é obrigatório'),
  coverUrl: z.string().url('Formato de url inválida'),
  totalAmount: z.coerce.number().optional().transform(v => v ?? 0),
});
export type CreateBookDTO = z.infer<typeof createBookDTO>;
export type CreaateBookResponse = Book;

export const updateBookDTO = createBookDTO.partial();
export type UpdateBookDTO = z.infer<typeof updateBookDTO>;
export type UpdateBookResponse = Book;

