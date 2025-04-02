import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; // Importa el nuevo componente
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] } // Ambos roles pueden acceder
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent, // Nueva ruta para admin
    canActivate: [AuthGuard],
    data: { roles: ['admin'] } // Solo admin puede acceder
  },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' } // Redirige rutas no encontradas a Home
];