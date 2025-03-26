import { ApiService } from "@/application/shared/services/api-service";
import { GetAccountsParams } from "./accouts-service-types";
import { GetAccountsResponse, MeResponse } from "./dto/account-dto";

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
}
