import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShopComponent } from './components/shop/shop.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'shop', component: ShopComponent },
  { path: '**', redirectTo: '/login' }
];
