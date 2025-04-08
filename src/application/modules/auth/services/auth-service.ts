import { ApiService } from "@/application/shared/services/api-service";
import { MeResponse } from "../../account/services/dto/account-dto";
import { SignInDTO, SignInResponse } from "./dto/auth-dto";

export class AuthService extends ApiService {
  private readonly baseUrl: string

  constructor(
    private readonly accessTokenKey = '@library-dashboard:access-token',
  ) {
    super();
    this.baseUrl = '/auth'
  }

  async me() {
    return this.httpClient.get<MeResponse>(`${this.baseUrl}/me`);
  }


  async signIn(dto: SignInDTO) {
    return this.httpClient.post<SignInResponse>(`${this.baseUrl}/sign-in`, dto);
  }

  logout(props?: {shallRedirect?: boolean}) {
    localStorage.removeItem(this.accessTokenKey);

    if (props?.shallRedirect && window.location.pathname !== '/auth/sign-in') {
      window.location.href = '/auth/sign-in';
    }
  }

  setToken({ accessToken }: SignInResponse) {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  getToken() {
    const accessToken = localStorage.getItem(this.accessTokenKey);

    return {
      accessToken,
    }
  }
}
