import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Search } from '../../services/search/search';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit{
  searchControl = new FormControl('');

  constructor(public authService: AuthService, private search: Search) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      this.search.setSearch(value || '');
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
