import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    console.log('Cerrando sesión...');
    this.authService.logout();
    console.log('Logout ejecutado');
  }
}
