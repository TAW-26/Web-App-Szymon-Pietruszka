import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { APIConnect } from '../services/api-connect';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome implements OnInit {
  backendMessage: string = "load"
  constructor(private messageConnect: APIConnect, private cdr: ChangeDetectorRef) {}

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
