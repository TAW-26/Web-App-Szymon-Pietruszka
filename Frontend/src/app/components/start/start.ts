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
  backendTitle: string = "load"
  backendDescription: string = ""
  
  constructor(private messageConnect: ApiConnect, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.messageConnect.getMessage().subscribe({
      next: (data) => {
        this.backendTitle = data.title;
        this.backendDescription = data.description; 
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.backendTitle = 'Failed to connect with backend';
        this.backendDescription = ''
        console.error(err);
      }
    });
  }
}
