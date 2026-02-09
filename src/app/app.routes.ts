import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Auth } from './pages/auth/auth';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Auth},
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
