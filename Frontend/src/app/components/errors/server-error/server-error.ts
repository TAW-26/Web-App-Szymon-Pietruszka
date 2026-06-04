import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.scss',
})
export class ServerError {
  refreshPage(): void {
    window.location.reload();
  }
}
