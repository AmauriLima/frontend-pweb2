import { ApiService } from "@/application/shared/services/api-service";
import { GetBooksParams } from "./books-service-types";
import { CreaateBookResponse, CreateBookDTO, GetBooksResponse, UpdateBookDTO, UpdateBookResponse } from "./dto/book-dto";

export class BooksService extends ApiService {
  private readonly baseUrl: string

  constructor(
  ) {
    super();
    this.baseUrl = '/books'
  }

  async getBooks(params?: GetBooksParams) {
    return this.httpClient.get<GetBooksResponse>(this.baseUrl, {
      params: {
        page: params?.page ?? 1,
        perPage: params?.perPage ?? 20,
      }
    });
  }

  async createBook(dto: CreateBookDTO) {
    return this.httpClient.post<CreaateBookResponse>(this.baseUrl, dto);
  }

  async updateBook(dto: UpdateBookDTO, bookId: string) {
    return this.httpClient.put<UpdateBookResponse>(`${this.baseUrl}/${bookId}`, dto);
  }

  async deleteBook(bookId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${bookId}`);
  }
}
