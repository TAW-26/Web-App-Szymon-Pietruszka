import { Routes } from '@angular/router';
import { Movies } from './components/movies/movies';
import { Welcome } from './components/welcome/welcome';

export const routes: Routes = [
    { path: '', component: Welcome },
    { path: 'discover', component: Movies },
];
