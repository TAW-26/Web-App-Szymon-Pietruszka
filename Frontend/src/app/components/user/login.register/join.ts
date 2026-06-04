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
  email = '';
  confirmPassword = '';
  errorMessage = '';
  isLoginMode = true;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.password = '';
    this.email = '';
    this.confirmPassword = '';
  }

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

  onRegister() {
    if (!this.email || !this.nickname || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Wypełnij pola.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Hasła nie są identyczne';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Emial ma niepoprawny frormat';
      return;
    }
    
    this.authService.register(this.email, this.nickname, this.password).subscribe({
      next: (res) => {
        console.log('Register success');
        this.router.navigate(['/discover']);
      },
      error: (err) => {
        console.log('Error:', err.status);
        
        if (err.status === 404 || err.status === 401) {
          this.errorMessage = 'Nie ma takiego użytkownika';
        }
        else if (err.status === 400) {
          this.errorMessage = 'Już istnieje taki użytkownik';
        }
        else {
          this.errorMessage = 'Something goes wrong. I can feel it';
        }

        this.cdr.detectChanges();
      }
    });
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}