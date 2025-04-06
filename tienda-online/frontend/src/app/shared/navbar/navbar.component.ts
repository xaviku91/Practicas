import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.authService.isLoggedInChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.checkAuthStatus();
    });
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      const decoded = token ? this.authService['jwtHelper'].decodeToken(token) : null;
      this.isAdmin = decoded?.roles?.includes('ROLE_ADMIN') || false;
    } else {
      this.isAdmin = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
