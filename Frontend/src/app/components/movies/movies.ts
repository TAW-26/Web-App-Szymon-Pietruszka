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
  actionText: string = ''

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
        this.setActionText('Film dodany do ulubionych')
      },

      error: (err) => {
        console.log('Error:', err.status);

        if (err.status === 409) {
          this.favortieDelete(id)
        }
        else if (err.status === 401) {
          this.setActionText('Nie jesteś zalogowany')
        }
        else {
          this.setActionText('Something goes wrong. I can feel it')
        }
      }
    });
  }

  favortieDelete(id: number) {
    this.authService.deleteFavorite(id).subscribe({
      next: (data) => {
        this.setActionText('Usunięto z listy ulubionych')
      },

      error: (err) => {
        console.log('Error:', err.status);
        
        if (err.status === 404) {
          this.setActionText('Film został już usunięty')
        }
        else if (err.status === 401) {
          this.setActionText('Nie jesteś zalogowany')
        }
        else {
          this.setActionText('Something goes wrong. I can feel it')
        }
      }
    });
  }


  rate(id_movie: number, rating: number): void {
    const movie = this.movies.find(m => m.id_movie === id_movie);
    if (movie) {
      this.authService.rating(id_movie, rating).subscribe({
        next: (data) => {
          this.setActionText('Dodano ocene')
        },

        error: (err) => {
          console.log('Error:', err.status);
          
          if (err.status === 409) {
            this.setActionText('Oddałeś już ocene')
          }
          else if (err.status === 401) {
            this.setActionText('Nie jesteś zalogowany')
          }
          else {
            this.setActionText('Something goes wrong. I can feel it')
          }
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
          this.setActionText('Recenzja wysłana')
        },

        error: (err) => {
          console.log('Error:', err.status);
          
          if (err.status === 409) {
            this.setActionText('Wysłałeś już recenzje')
          }
          else if (err.status === 401) {
            this.setActionText('Nie jesteś zalogowany')
          }
          else {
            this.setActionText('Something goes wrong. I can feel it');
          }
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

  setActionText(text: string): void {
    this.actionText = text
    this.cdr.detectChanges();

    setTimeout(() => {
      this.actionText = ''
      this.cdr.detectChanges();
    }, 1500);
  }
}
