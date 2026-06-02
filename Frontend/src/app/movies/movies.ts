import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MovieResponse } from '../models/data.models';
import { APIConnect } from '../services/api-connect';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  movies: MovieResponse[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private apiService: APIConnect,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load movies data';
        this.isLoading = false;
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }
}
