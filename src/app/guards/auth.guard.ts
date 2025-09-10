import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //console.log('AuthGuard ejecutado');
    //console.log('isAuthenticated:', this.authService.isAuthenticated());
    //console.log('userRole:', this.authService.getUserRole());

    const requiredRole: string = route.data['requiredRole'];

    if (!this.authService.isAuthenticated()) {
      //console.warn('⛔ Usuario no autenticado. Redirigiendo a /login');
      this.router.navigate(['/login']);
      return false;
    }

    if (this.authService.isBloqueado()) {
      //console.warn('⛔ Usuario bloqueado. Redirigiendo a /blocked');
      this.router.navigate(['/blocked']);
      return false;
    }

    if (requiredRole) {
      const userRole = this.authService.getUserRole();
      if (userRole !== requiredRole) {
        //console.warn(`⛔ Rol insuficiente. Requiere: ${requiredRole}, Usuario: ${userRole}`);
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  }
}
