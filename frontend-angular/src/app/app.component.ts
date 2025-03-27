import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDarkMode = false; // Variable para rastrear el estado del modo oscuro

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Verificar el estado inicial del modo oscuro
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode; // Alternar el estado
    document.documentElement.classList.toggle('dark');
  }
}