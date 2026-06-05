import { Injectable } from '@angular/core';
import { config } from '../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/data.models';

@Injectable({
  providedIn: 'root',
})
export class ApiConnect {
  private apiUrl = `${config.url}/`

  constructor(private http: HttpClient) {}

  getMessage(): Observable<{ title: string, description: string }> {
    return this.http.get<{ title: string, description: string }>(this.apiUrl)
  }

  getMovies(): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>(`${this.apiUrl}movies`);
  }

  searchMovies(term: string): Observable<MovieResponse[]> {
    const params = new HttpParams().set('q', term);
    return this.http.get<MovieResponse[]>(`${this.apiUrl}search`, { params });
  }
}