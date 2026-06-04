import { Routes } from '@angular/router';
import { Start } from './components/start/start';
import { Movies } from './components/movies/movies';
import { Join } from './components/user/login.register/join';
import { UserData } from './components/user/user.data/user.data';
import { Favorites } from './components/favorites/favorites';
import { Activity } from './components/activity/activity';
import { authGuard } from './services/auth/auth-guard';
import { NotFound } from './components/errors/not-found/not-found';
import { ServerError } from './components/errors/server-error/server-error';

export const routes: Routes = [
    { path: '', component: Start},
    { path: 'discover', component: Movies },
    { path: 'activity', component: Activity, canActivate: [authGuard]},
    { path: 'favorite', component: Favorites, canActivate: [authGuard]},
    { path: 'account', component: UserData, canActivate: [authGuard] },
    { path: 'login-register', component: Join },
    { path: 'server-error', component: ServerError }, 
    { path: '**', component: NotFound },
];