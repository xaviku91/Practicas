import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    console.log('Enviando:', { email: this.email, password: this.password }); // Verifica los datos enviados
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Respuesta:', response); // Verifica la respuesta
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error completo:', err); // Muestra el error completo
        this.errorMessage = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }
}