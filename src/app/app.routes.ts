import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorComponent } from './components/errors/error/error.component';
import { AuthLayoutComponent } from './components/auth/auth-layout/auth-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { UsersComponent } from './components/users/users.component';
import { BillComponent } from './components/bill/bill.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'products', component: ProductComponent },
      { path: 'users', component: UsersComponent },
      { path: 'bills', component: BillComponent },
    ]
  },
  { path: '**', component: ErrorComponent },

];
