import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  private urlFavorite = '/favorite/'
  private urlFavoriteDelete = '/favorite/delete/'
  private urlUserUpdateData = '/user'
  private urlPostRating = '/rating'
  private urlPostReview = '/review'

  private loggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  }

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

  putUserData(data: any): Observable<any> {
    const fullURL = this.apiUrl + this.urlUserUpdateData
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(fullURL, data, { headers, responseType: 'text' as 'json' });
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


  setFavorite(id: number): Observable<any> {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const fullUrl = `${this.apiUrl}${this.urlFavorite}${id}`;

    return this.http.post<any>(fullUrl, {}, { headers });
  }

  deleteFavorite(id: number): Observable<any> {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const fullUrl = `${this.apiUrl}${this.urlFavoriteDelete}${id}`;

    return this.http.delete<any>(fullUrl, { headers });
  }

  rating(id_movie: number, rating: number): Observable<any> {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const fullUrl = `${this.apiUrl}${this.urlPostRating}`;

    return this.http.post<any>(fullUrl, { id_movie, rating }, { headers })
  }

  review(id_movie: number, text: string): Observable<any> {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const fullUrl = `${this.apiUrl}${this.urlPostReview}`;

    return this.http.post<any>(fullUrl, { id_movie, text }, { headers })
  }



  private hasToken(): boolean {
    return this.cookieService.check('access_token');
  }

  getToken(): string {
    return this.cookieService.get('access_token');
  }

  logout(): void {
    this.cookieService.delete('access_token', '/');
    this.loggedIn.next(false);
  }

  loginSuccess(): void {
    this.loggedIn.next(true);
  }

  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }
}