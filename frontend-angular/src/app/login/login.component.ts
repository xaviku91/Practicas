// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthError, AuthResponse, AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        this.message = response.message;
        if (response.token) {
          this.authService.saveToken(response.token);
          // Esperar a que getUser se complete antes de redirigir
          this.authService.getUser().subscribe({
            next: (user) => {
              this.authService.setUser(user);
              this.authService.redirectToDashboard();
            },
            error: (err) => {
              this.message = 'Error al cargar datos del usuario';
              console.error('Error al obtener usuario:', err);
            }
          });
        }
      },
      error: (error: { error: AuthError }) => {
        this.message = error.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}
