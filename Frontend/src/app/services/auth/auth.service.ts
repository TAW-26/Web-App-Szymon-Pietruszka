import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenResponse } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  private urlLogin = '/login'
  private urlRegister = '/register'
  private urlUser = '/user/me'
  private urlFavorites = '/favorites/user'
  private urlReviews = '/reviews/user'
  private urlRatings = '/ratings/user'

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(nickname: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.apiUrl + this.urlLogin, { nickname, password }).pipe(
      tap(response => {
        this.cookieService.set('access_token', response.access_token, 1, '/');
      })
    );
  }

  register(email: string, nickname: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.apiUrl + this.urlRegister, { nickname, password, email }).pipe(
      tap(response => {
        this.cookieService.set('access_token', response.access_token, 1, '/');
      })
    );
  }

  getData(fullURL: string): Observable<any> {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(fullURL, { headers });
  }

  getUserData(): Observable<any> {
    return this.getData(this.apiUrl + this.urlUser)
  }

  getUserFavorites(): Observable<any> {
    return this.getData(this.apiUrl + this.urlFavorites)
  }

  getUserReviews(): Observable<any> {
    return this.getData(this.apiUrl + this.urlReviews)
  }

  getUserRatings(): Observable<any> {
    return this.getData(this.apiUrl + this.urlRatings)
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