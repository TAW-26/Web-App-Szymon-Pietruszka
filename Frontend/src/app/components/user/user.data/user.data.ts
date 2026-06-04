import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserDataResponse } from '../../../services/models/data.models';

@Component({
  selector: 'app-user.data',
  standalone: true,
  templateUrl: './user.data.html',
  styleUrl: './user.data.scss',
})
export class UserData implements OnInit{
  userData: UserDataResponse | null = null;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUserData().subscribe({
      next: (response: UserDataResponse) => {
        this.userData = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to load user data: ", err);
      }
    })
  }
}
