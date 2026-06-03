import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Start } from "./components/start/start";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Start],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
