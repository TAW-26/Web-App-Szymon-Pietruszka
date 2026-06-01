import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageConnect } from './services/message-connect';
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
  constructor(private messageConnect: MessageConnect, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.messageConnect.getMessage().subscribe({
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
