import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join.html',
  styleUrl: './join.scss',
})

export class Join {
  nickname = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  onLogin(): void {
    this.errorMessage = '';

    if (!this.nickname || !this.password) {
      this.errorMessage = 'Uzupełnij pola';
      return;
    }

    this.authService.login(this.nickname, this.password).subscribe({
      next: (res) => {
        console.log('Login success');
        this.router.navigate(['/discover']);
      },
      error: (err) => {
        console.log('Error:', err.status);
        
        if (err.status === 404 || err.status === 401) {
          this.errorMessage = 'Błęden hasło albo nickname';
        }
        else {
          this.errorMessage = 'Something goes wrong. I can feel it';
        }

        this.cdr.detectChanges();
      }
    });
  }
}