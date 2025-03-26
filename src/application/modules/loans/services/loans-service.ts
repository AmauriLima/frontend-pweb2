import { ApiService } from "@/application/shared/services/api-service";

import { CloseLoanResponse, CreateLoanDTO, CreateLoanResponse, GetLoansResponse } from "./dto/loans-dto";
import { GetLoansParams } from "./loans-service-types";

export class LoansService extends ApiService {
  private readonly baseUrl: string

  constructor(
  ) {
    super();
    this.baseUrl = '/loans'
  }

  async getLoans(params?: GetLoansParams) {
    return this.httpClient.get<GetLoansResponse>(this.baseUrl, {
      params: {
        accountId: params?.accountId,
        page: params?.page ?? 1,
        perPage: params?.perPage ?? 20,
      }
    });
  }

  async createLoan(dto: CreateLoanDTO) {
    return this.httpClient.post<CreateLoanResponse>(this.baseUrl, dto);
  }

  async closeLoan(loanId: string) {
    return this.httpClient.patch<CloseLoanResponse>(`${this.baseUrl}/${loanId}`);
  }
}
