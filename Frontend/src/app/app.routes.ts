import { Routes } from '@angular/router';
import { Start } from './components/start/start';
import { Movies } from './components/movies/movies';
import { Join } from './components/user/login.register/join';
import { UserData } from './components/user/user.data/user.data';

export const routes: Routes = [
    { path: '', component: Start},
    { path: 'discover', component: Movies },
    { path: 'account', component: UserData },
    { path: 'login-register', component: Join },
];
