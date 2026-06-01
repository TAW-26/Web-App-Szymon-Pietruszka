import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  backendMessage: string = "load"
  constructor(private APIservice: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.APIservice.getMessage().subscribe({
      next: (data) => {
        this.backendMessage = data.message; 
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.backendMessage = 'Failed to connect with backend';
        console.error(err);
      }
    });
  }
}
