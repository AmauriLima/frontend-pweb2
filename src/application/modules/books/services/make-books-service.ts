import { BooksService } from "./books-service";

export function makeBooksService() {
  return new BooksService();
}
