import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserFavoritesResponse } from '../../services/models/data.models';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  userFavorites: UserFavoritesResponse | null = null;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

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
}
