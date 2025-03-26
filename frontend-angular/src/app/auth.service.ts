// src/app/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Interfaz para tipar las respuestas de la API
export interface AuthResponse {
  message: string;
  token?: string; // Opcional, solo viene en login
}

// Interfaz para tipar los errores de la API
export interface AuthError {
  message: string;
}

// Servicio de autenticación para la app
@Injectable({
  providedIn: 'root',
})

// Implementación del servicio de autenticación
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Ajusta si tu Laravel corre en otro puerto

  constructor(private http: HttpClient, private router: Router) {}

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Hacer login enviando email y contraseña a la API
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
  }

  // Guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Redirigir al dashboard
  redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }


}
