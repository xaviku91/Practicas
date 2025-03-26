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
    console.log('Email enviado:', this.email); // Depuración
    console.log('Password enviado:', this.password); // Depuración
    this.authService.login(this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        this.message = response.message;
        if (response.token) {
          this.authService.saveToken(response.token);
          this.authService.redirectToDashboard();
        }
      },
      error: (error: { error: AuthError }) => {
        this.message = error.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}
