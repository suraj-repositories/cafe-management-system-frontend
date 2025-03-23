import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorComponent } from './components/errors/error/error.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: '**', component: ErrorComponent },
];
