import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
 private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { id: string; password: string }): Observable<any> {
    console.log('📤 Enviando credenciales al servidor:', credentials);
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Asume que la respuesta tiene: { token: string, usuario: { permisos: string, nombre: string } }
        this.saveUserData(response.token, response.usuario.permisos, response.usuario.nombre);
      }),
      catchError((error) => {
        console.error('❌ Error en la solicitud HTTP:', error);
        return throwError(() => new Error('Error en el servidor'));
      })
    );
  }

  saveUserData(token: string, userRole: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole); // Nuevo: 'Administrador', 'Sustentante', etc.
    localStorage.setItem('username', username);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || 'Bloqueado'; // Rol predeterminado si no hay ninguno
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    console.log('🚪 Cerrando sesión, limpiando localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
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
    const resumen = {
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

    console.log('📋 Resumen del usuario:', resumen);
    return resumen;
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

  printUserResumen(): void {
    const resumen = this.getUserResumen();

    console.log('👤 RESUMEN DEL USUARIO 👤');
    console.log('──────────────────────────');
    console.log(`✅ Autenticado: ${resumen.isAuthenticated ? 'Sí' : 'No'}`);
    console.log(`🛠️ Administrador: ${resumen.isAdministrador ? 'Sí' : 'No'}`);
    console.log(`📝 Revisor: ${resumen.isRevisor ? 'Sí' : 'No'}`);
    console.log(`📚 Sustentante: ${resumen.isSustentante ? 'Sí' : 'No'}`);
    console.log(`⛔ Bloqueado: ${resumen.isBloqueado ? 'Sí' : 'No'}`);
    console.log('──────────────────────────');
    console.log(`📊 Rol: ${resumen.userData.userRole}`);
    console.log(`👤 Nombre: ${resumen.userData.username}`);
    console.log(`📋 Estado: ${resumen.status}`);
    console.log('──────────────────────────');
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

