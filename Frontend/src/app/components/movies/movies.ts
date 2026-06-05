import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MovieResponse } from '../../services/models/data.models';
import { ApiConnect } from '../../services/API/api-connect';
import { AuthService } from '../../services/auth/auth.service';

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
  favoriteMessage: string = ''
  maxStars: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  hoverRatings: { [movieId: number]: number } = {};
  openedFormId: number | null = null;
  openedReviewsId: number | null = null;

  constructor(public authService: AuthService, private apiService: ApiConnect, private cdr: ChangeDetectorRef) {}

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

  favortie(id: number) {
    this.authService.setFavorite(id).subscribe({
      next: (data) => {
        console.log("added to favortie")
        this.favoriteMessage = 'Film dodany do ulubionych';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error:', err.status);

        if (err.status === 409) {
          this.favortieDelete(id)
        }
        else if (err.status === 401) {
          this.favoriteMessage = 'Nie poprawny JWT';
        }
        else {
          this.favoriteMessage = 'Something goes wrong. I can feel it';
        }

        this.cdr.detectChanges();
      }
    });
  }

  favortieDelete(id: number) {
    this.authService.deleteFavorite(id).subscribe({
      next: (data) => {
        console.log("delete from favortie")
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error:', err.status);
        
        if (err.status === 404) {
          this.favoriteMessage = 'Film został już usunięty dodany';
        }
        else if (err.status === 401) {
          this.favoriteMessage = 'Nie poprawny JWT';
        }
        else {
          this.favoriteMessage = 'Something goes wrong. I can feel it';
        }

        this.cdr.detectChanges();
      }
    });
  }


  rate(id_movie: number, rating: number): void {
    const movie = this.movies.find(m => m.id_movie === id_movie);
    if (movie) {
      this.authService.rating(id_movie, rating).subscribe({
        next: (data) => {
          console.log("added rating")
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log('Error:', err.status);
          
          if (err.status === 409) {
            console.log('Film dostał już ocene');
          }
          else if (err.status === 401) {
            console.log('Nie poprawny JWT');
          }
          else {
            console.log('Something goes wrong. I can feel it');
          }

          this.cdr.detectChanges();
        }
      });
    }
  }

  
  enterHover(movieId: number, rating: number): void {
    this.hoverRatings[movieId] = rating;
  }

  leaveHover(movieId: number): void {
    this.hoverRatings[movieId] = 0;
  }

  reviewCreate(id_movie: number, text: string): void {
    const movie = this.movies.find(m => m.id_movie === id_movie);
    this.openedFormId = null;
    if (movie) {
      this.authService.review(id_movie, text).subscribe({
        next: (data) => {
          console.log("added review")
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log('Error:', err.status);
          
          if (err.status === 409) {
            console.log('Film dostał już recenzje');
          }
          else if (err.status === 401) {
            console.log('Nie poprawny JWT');
          }
          else {
            console.log('Something goes wrong. I can feel it');
          }

          this.cdr.detectChanges();
        }
      });
    }
  }

  toggleForm(movieId: number, propertyName: 'openedFormId' | 'openedReviewsId'): void {
    if (this[propertyName] === movieId) {
      this[propertyName] = null;
    } else {
      this[propertyName] = movieId;
    }
  }
}
