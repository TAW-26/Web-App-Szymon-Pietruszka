import { Routes } from '@angular/router';
import { Start } from './components/start/start';
import { Movies } from './components/movies/movies';

export const routes: Routes = [
    { path: '', component: Start},
    { path: 'discover', component: Movies },

];
