import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorComponent } from './components/errors/error/error.component';
import { AuthLayoutComponent } from './components/auth/auth-layout/auth-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
    ]
  },
  { path: '**', component: ErrorComponent },

];
