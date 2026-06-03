import { Injectable } from '@angular/core';
import { config } from './config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from './models/data.models';

@Injectable({
  providedIn: 'root',
})
export class ApiConnect {
  private apiUrl = `${config.url}/`

  constructor(private http: HttpClient) {}

  getMessage(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(this.apiUrl)
  }

  getMovies(): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>(`${this.apiUrl}movies`);
  }
}