import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = '';
  password = '';
  nombre = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Enviando registro:', { email: this.email, password: this.password, nombre: this.nombre });
    this.authService.register(this.email, this.password, this.nombre).subscribe({
      next: (response) => {
        console.log('Respuesta registro:', response);
        this.router.navigate(['/shop']);
      },
      error: (err) => {
        console.error('Error registro:', err);
        this.error = err.status === 409 ? 'El email ya está registrado' : 'Error al registrar';
      }
    });
  }
}
