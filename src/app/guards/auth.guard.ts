// src/app/guards/auth.guard.ts

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
    const allowedRoles: string[] = route.data['allowedRoles'];

    // 1. Validar autenticación
    if (!this.authService.isAuthenticated()) {
      console.warn('🔐 No autenticado. Redirigiendo a /login');
      this.router.navigate(['/login']);
      return false;
    }

    // 2. Validar si está bloqueado
    if (this.authService.isBloqueado()) {
      console.warn('⛔ Usuario bloqueado. Redirigiendo a /login');
      this.router.navigate(['/login']);
      return false;
    }

    // 3. Validar rol permitido
    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = this.authService.getUserRole();
      if (!allowedRoles.includes(userRole)) {
        console.warn(`🚫 Acceso denegado. Rol "${userRole}" no permitido. Se requiere uno de: ${allowedRoles.join(', ')}`);
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
  }
}
