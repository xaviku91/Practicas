import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take, timeout } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private readonly TIMEOUT_MS = 5000;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.authService.isAuthenticated()) {
      this.redirectToLogin(state.url);
      return of(false);
    }

    return this.authService.user$.pipe(
      take(1),
      timeout(this.TIMEOUT_MS),
      map(user => {
        console.log('Usuario en AuthGuard:', user); // Depura aquí
        if (!user) {
          this.redirectToLogin(state.url);
          return false;
        }
        if (route.data['roles'] && !route.data['roles'].includes(user.role)) {
          this.router.navigate(['/unauthorized']);
          return false;
        }
        return true;
      }),
      catchError(error => {
        this.redirectToLogin(state.url);
        return of(false);
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  private redirectToLogin(originalUrl: string): void {
    console.debug(`[AuthGuard] Redirecting to login from ${originalUrl}`);
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: originalUrl },
      queryParamsHandling: 'merge'
    });
  }
}