import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
  console.log('AuthGuard ejecutado');
  console.log('isAuthenticated:', this.authService.isAuthenticated());
  console.log('isBlocked:', this.authService.isBlocked());

  const requiredLevel = route.data['requiredLevel'];
  console.log('requiredLevel:', requiredLevel);
  console.log('userLevel:', this.authService.getUserLevel());

  if (!this.authService.isAuthenticated()) {
    this.router.navigate(['/login']);
    return false;
  }

  if (this.authService.isBlocked()) {
    this.router.navigate(['/blocked']);
    return false;
  }

  if (requiredLevel !== undefined) {
    const userLevel = this.authService.getUserLevel();
    if (userLevel < requiredLevel) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }

  return true;
}
}