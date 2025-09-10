import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
  private apiUrl = 'http://localhost:3000';

  // BehaviorSubject para emitir el rol actual; inicia con el rol almacenado o 'Bloqueado'
  private userRoleSubject = new BehaviorSubject<string>(this.getUserRole());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { id: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveUserData(
          response.token, 
          response.usuario.permisos, 
          response.usuario.nombre, 
          response.usuario.id_usuario
        );
        this.userRoleSubject.next(response.usuario.permisos);  // Actualiza el BehaviorSubject
      }),
      catchError((error) => {
        return throwError(() => new Error('Error en el servidor'));
      })
    );
  }

  saveUserData(token: string, userRole: string, username: string, userId: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId.toString());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || 'Bloqueado';
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    this.userRoleSubject.next('Bloqueado'); // Actualiza el BehaviorSubject para reflejar logout
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null && this.getUserRole() !== 'Bloqueado';
  }

  isAdministrador(): boolean {
    return this.getUserRole() === 'Administrador';
  }

  isSustentante(): boolean {
    return this.getUserRole() === 'Sustentante';
  }

  isRevisor(): boolean {
    return this.getUserRole() === 'Revisor';
  }

  isBloqueado(): boolean {
    return this.getUserRole() === 'Bloqueado';
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getUserResumen(): any {
    return {
      isAuthenticated: this.isAuthenticated(),
      isAdministrador: this.isAdministrador(),
      isSustentante: this.isSustentante(),
      isRevisor: this.isRevisor(),
      isBloqueado: this.isBloqueado(),
      userData: {
        userRole: this.getUserRole(),
        username: this.getUsername() || 'No disponible'
      },
      status: this.getUserStatus()
    };
  }

  getUserStatus(): string {
    if (!this.isAuthenticated()) {
      return 'No autenticado';
    }

    if (this.isBloqueado()) {
      return 'Usuario bloqueado';
    }

    if (this.isAdministrador()) {
      return 'Administrador autenticado';
    }

    if (this.isRevisor()) {
      return 'Revisor autenticado';
    }

    if (this.isSustentante()) {
      return 'Sustentante autenticado';
    }

    return 'Usuario autenticado';
  }

  getQuickStatus(): string {
    const token = this.getToken();
    const role = this.getUserRole();
    const name = this.getUsername();

    if (!token) {
      return '❌ Sin token - No autenticado';
    }

    return `${this.isAuthenticated() ? '✅' : '❌'} ${name || 'Usuario'} - Rol: ${role}`;
  }
}
