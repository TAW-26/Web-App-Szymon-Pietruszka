import { Routes } from '@angular/router';
import { Start } from './components/start/start';
import { Movies } from './components/movies/movies';
import { Join } from './components/user/login.register/join';

export const routes: Routes = [
    { path: '', component: Start},
    { path: 'discover', component: Movies },
    { path: 'login-register', component: Join },
];
