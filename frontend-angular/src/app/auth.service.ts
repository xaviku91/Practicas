// src/app/auth.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Asegúrate de importar HttpHeaders
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Interfaz para tipar las respuestas de la API
export interface AuthResponse {
  message: string;
  token?: string; // Opcional, solo viene en login
  user?: any; // Agregamos user para el registro
}

// Interfaz para tipar los errores de la API
export interface AuthError {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL de tu API Laravel

  constructor(private http: HttpClient, private router: Router) { }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Hacer login enviando email y contraseña a la API
  login(email: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }, { headers });
  }

  // Hacer registro enviando name, email y password a la API
  register(name: string, email: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      { name, email, password },
      { headers }
    );
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