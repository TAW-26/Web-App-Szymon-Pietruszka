import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserFavoritesResponse } from '../../services/models/data.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  userFavorites: UserFavoritesResponse | null = null;
  favoriteMessage: string = '';
  isCooldown: boolean = false;

  constructor(public authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserFavorites();
  }

  loadUserFavorites(): void {
    this.authService.getUserFavorites().subscribe({
      next: (response: UserFavoritesResponse) => {
        this.userFavorites = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to load user favorites: ", err);
      }
    })
  }

  favortieDelete(id: number) {
    if (this.isCooldown) return;

    this.isCooldown = true;

    this.authService.deleteFavorite(id).subscribe({
      next: (data) => {
        console.log("delete from favortie")

        if (this.userFavorites && this.userFavorites.favorite) {
          this.userFavorites.favorite = this.userFavorites.favorite.filter(
            (movie: any) => movie.id_movie !== id
          );
        }

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
      }
    });

    setTimeout(() => {
      this.isCooldown = false;
    }, 2000);
  }
}
