// src/app/auth.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

// Interfaz para tipar las respuestas de la API
export interface AuthResponse {
  message: string;
  token?: string;
  user?: any;
}

// Interfaz para tipar los errores de la API
export interface AuthError {
  message: string;
}

// Interfaz para el usuario
export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

// src/app/auth.service.ts (extracto relevante)
login(email: string, password: string): Observable<AuthResponse> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });
  return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }, { headers }).pipe(
    tap((response) => {
      if (response.token) {
        this.saveToken(response.token);
        this.getUser().subscribe({
          next: (user) => this.setUser(user),
          error: (err) => console.error('Error al obtener usuario tras login:', err)
        });
      }
    })
  );
}

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

  getUser(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    });
    return this.http.get<User>(`${this.apiUrl}/user`, { headers });
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
