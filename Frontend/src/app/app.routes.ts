import { Routes } from '@angular/router';
import { Movies } from './movies/movies';
import { Welcome } from './welcome/welcome';

export const routes: Routes = [
    { path: '', component: Welcome },
    { path: 'discover', component: Movies },
];
