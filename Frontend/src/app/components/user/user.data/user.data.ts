import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserDataResponse } from '../../../services/models/data.models';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user.data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.data.html',
  styleUrl: './user.data.scss',
})
export class UserData implements OnInit{
  userData: UserDataResponse | null = null;
  editForm: any = {};
  isEditing: boolean = false;
  errorMessage: string = ''

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit(): void { this.loadUserProfile(); }

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

  cancelEditing() {
    this.isEditing = false;
  }

  startEditing() {
    this.editForm = { 
      name: this.userData?.name || '', 
      gender: this.userData?.gender || '',
      birthdate: this.userData?.birthdate || '' ,
    };
    this.isEditing = true;
  }

  saveChanges() {
    this.authService.putUserData(this.editForm).subscribe({
      next: (response: any) => {
        console.log('Dane zapisane pomyślnie!', response);

        if (this.userData) {
          this.userData.name = this.editForm.name;
          this.userData.gender = this.editForm.gender;
          this.userData.birthdate = this.editForm.birthdate;
        }
        
        this.isEditing = false;
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Coś poszło nie tak podczas zapisu:', err);

        if (err.status === 400) {
          this.errorMessage = 'Błędna data urodzin';
          this.cdr.detectChanges();

          setTimeout(() => {
            this.errorMessage = '';
            this.cdr.detectChanges();
          }, 4000);
        }
      }
    });
  }
}
