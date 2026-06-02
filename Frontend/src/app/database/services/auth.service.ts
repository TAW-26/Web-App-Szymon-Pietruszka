import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/login';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(nickname: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { nickname, password }).pipe(
      tap(response => {
        this.cookieService.set('access_token', response.access_token, 1, '/');
      })
    );
  }

  getToken(): string {
    return this.cookieService.get('access_token');
  }

  logout(): void {
    this.cookieService.delete('access_token', '/');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('access_token');
  }
}