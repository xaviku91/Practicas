import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Enviando login:', { email: this.email, password: this.password });
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Respuesta login:', response);
        this.router.navigate(['/shop']);
      },
      error: (err) => {
        console.error('Error login:', err);
        this.error = 'Credenciales inválidas';
      }
    });
  }
}
