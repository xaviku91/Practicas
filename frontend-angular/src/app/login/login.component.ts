import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';

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
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router // Inyecta el Router
  ) { }

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.message = '';

    this.authService.login(this.email, this.password)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (user) => {
        },
        error: (error) => {
          this.message = error.message || 'Error al iniciar sesión';
        }
      });
  }
}