import { ChangeDetectorRef, OnInit, Component } from '@angular/core';
import { ApiConnect } from '../../services/API/api-connect';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.html',
  styleUrl: './start.scss',
})
export class Start implements OnInit{
  backendMessage: string = "load"
  constructor(private messageConnect: ApiConnect, private cdr: ChangeDetectorRef) {}

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
