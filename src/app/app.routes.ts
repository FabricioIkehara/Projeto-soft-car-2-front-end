
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsRegisterComponent } from './pages/clients-register/clients-register.component';
import { OrderRegisterComponent } from './pages/order-register/order-register.component';




export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent},
  { path: 'clients-register', component: ClientsRegisterComponent},
  { path: 'order-register', component: OrderRegisterComponent}
];
