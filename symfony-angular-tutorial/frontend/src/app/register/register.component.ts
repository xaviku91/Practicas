import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.email, this.password, this.name).subscribe({
      next: () => {
        this.message = 'Registro exitoso. Por favor, inicia sesión.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => this.message = err.error.error || 'Error al registrarse'
    });
  }
}