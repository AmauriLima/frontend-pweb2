export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  BOOK_MANAGER = 'BOOK_MANAGER',
  USER_MANAGER = 'USER_MANAGER',
  USER = 'USER',
}

export interface Account {
  id: string;
  name: string;
  email: string;
  roleCode: Roles;
  createdAt: Date;
  updateAt: Date;
}

export type MeResponse = Account;

export interface GetAccountsResponse {
  data: Account[];
  totalItems: number;
}
