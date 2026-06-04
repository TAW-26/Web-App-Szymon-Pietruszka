import { Routes } from '@angular/router';
import { Start } from './components/start/start';
import { Movies } from './components/movies/movies';
import { Join } from './components/user/login.register/join';
import { UserData } from './components/user/user.data/user.data';
import { Favorites } from './components/favorites/favorites';
import { Activity } from './components/activity/activity';

export const routes: Routes = [
    { path: '', component: Start},
    { path: 'discover', component: Movies },
    { path: 'activity', component: Activity },
    { path: 'favorite', component: Favorites },
    { path: 'account', component: UserData },
    { path: 'login-register', component: Join },
];
