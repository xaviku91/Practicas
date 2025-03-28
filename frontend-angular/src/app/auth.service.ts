import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, switchMap, tap } from 'rxjs/operators';

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}

export interface AuthError {
  message: string;
  errors?: { [key: string]: string[] };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable().pipe(shareReplay(1));
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }, { headers }).pipe(
      switchMap(response => {
        if (!response.token) {
          return throwError(() => new Error('No token received'));
        }

        this.saveToken(response.token);

        // Usa el usuario de la respuesta si existe, o haz una llamada a getUser
        const user = response.user || null;
        if (user) {
          this.setUser(user);
          return of(user);
        }
        return this.getUser();
      }),
      tap(user => {
        this.setUser(user);
        this.redirectBasedOnRole(user.role); // Esto debería funcionar ahora
      }),
      catchError(error => {
        this.logout();
        return throwError(() => this.handleError(error));
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
    ).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  getUser(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No authentication token'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    });

    return this.http.get<User>(`${this.apiUrl}/user`, { headers }).pipe(
      tap(user => {
        this.currentUser = user;
        this.setUser(user);
      }),
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  private setUser(user: User): void {
    this.currentUser = user;
    this.userSubject.next(user);
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private redirectBasedOnRole(role?: string): void {
    const targetUrl = role === 'admin' ? '/admin/dashboard' : '/dashboard'; // Simplifica, elimina returnUrl por ahora
    this.router.navigateByUrl(targetUrl);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  private handleError(error: any): AuthError {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      return { message: 'Error de conexión' };
    } else {
      // Error del servidor
      return error.error || { message: 'Error desconocido' };
    }
  }

  // Obtener lista de usuarios
  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    });
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers }).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    });
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers }).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  // Actualizar un usuario
  updateUser(id: number, data: Partial<User>): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.put(`${this.apiUrl}/users/${id}`, data, { headers }).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }
}