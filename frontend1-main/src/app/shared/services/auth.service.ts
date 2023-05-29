import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL: string = environment.baseUrl

  login(payload: {}): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.BASE_URL}/api/auth/login`,
      payload
    );
  }

  register(payload: {}): Observable<any> {
    return this.httpClient.post<any>(
      `${this.BASE_URL}/api/auth/signup`,
      payload
    );
  }
}

export interface AuthResponse {
  access_token: string;
}
