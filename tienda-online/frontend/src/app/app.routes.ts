import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
    children: [
      { path: '', loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent) }
    ]
  },
  {
    path: 'shop',
    children: [
      { path: '', loadComponent: () => import('./shop/home/home.component').then(c => c.HomeComponent) },
      { path: 'productos', loadComponent: () => import('./shop/productos/productos.component').then(c => c.ProductosComponent) },
      { path: 'carrito', loadComponent: () => import('./shop/carrito/carrito.component').then(c => c.CarritoComponent) },
      { path: 'contacto', loadComponent: () => import('./shop/contacto/contacto.component').then(c => c.ContactoComponent) },
      { path: 'perfil', loadComponent: () => import('./shop/perfil/perfil.component').then(c => c.PerfilComponent) }
    ]
  },
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: '**', redirectTo: '/shop' }
];
