import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor(private authService: AuthService) { }

  onSubmit() {
    console.log('Nombre enviado:', this.name);
    console.log('Email enviado:', this.email);
    console.log('Password enviado:', this.password);
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        this.message = response.message;
        this.authService.redirectToDashboard(); // Usamos el método público
      },
      error: (error: { error: AuthError }) => {
        this.message = error.error?.message || 'Error al registrar usuario';
        console.error('Error completo:', error);
      },
    });
  }
}