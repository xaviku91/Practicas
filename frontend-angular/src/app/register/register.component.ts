// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router
import { AuthError, AuthResponse, AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        this.message = response.message;
        // Redirigir al login después del registro exitoso
        this.router.navigate(['/login']);
      },
      error: (error: { error: AuthError }) => {
        this.message = error.error?.message || 'Error al registrar usuario';
        console.error('Error completo:', error);
      },
    });
  }
}
