import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Search {
  private search$ = new BehaviorSubject<string>('');

  setSearch(term: string): void {
    this.search$.next(term);
  }

  getSearch(): Observable<string> {
    return this.search$.asObservable();
  }
}