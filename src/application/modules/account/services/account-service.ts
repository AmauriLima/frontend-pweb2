import { ApiService } from "@/application/shared/services/api-service";
import { GetAccountsParams } from "./accouts-service-types";
import { CreateAccountDTO, CreateAccountResponse, GetAccountsResponse, MeResponse, UpdateAccountDTO, UpdateAccountResponse } from "./dto/account-dto";

export class AccountService extends ApiService {
  private readonly baseUrl: string

  constructor(
  ) {
    super();
    this.baseUrl = '/accounts'
  }

  async me() {
    return this.httpClient.get<MeResponse>(`${this.baseUrl}/me`);
  }

  async getAccounts(params?: GetAccountsParams) {
    return this.httpClient.get<GetAccountsResponse>(this.baseUrl, {
      params: {
        page: params?.page ?? 1,
        perPage: params?.perPage ?? 20,
      }
    });
  }

  async createAccount(dto: CreateAccountDTO) {
    return this.httpClient.post<CreateAccountResponse>(this.baseUrl, dto);
  }

  async updateAccount(dto: UpdateAccountDTO, accountId: string) {
    return this.httpClient.put<UpdateAccountResponse>(`${this.baseUrl}/${accountId}`, dto);
  }

  async deleteAccount(accountId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${accountId}`);
  }
}
