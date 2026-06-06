import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.scss',
})
export class ServerError {
  private router = inject(Router);

  refreshPage(): void {
    this.router.navigate(['/']);
  }
}