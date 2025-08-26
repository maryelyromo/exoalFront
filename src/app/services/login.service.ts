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

  login(credentials: { numemp: string; contrasena: string }): Observable<any> {
    console.log('📤 Enviando credenciales al servidor:', credentials);
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        //console.log('✅ Respuesta del servidor:', response);
        // Asume que la respuesta tiene: { token: string, nivel: number, username: string }
        this.saveUserData(response.token, response.usuario.userLevel, response.usuario.nombre);
      }),
      catchError((error) => {
        console.error('❌ Error en la solicitud HTTP:', error);
        return throwError(() => new Error('Error en el servidor'));
      })
    );
  }

  saveUserData(token: string, userLevel: number, username: string): void {
    //console.log('💾 Guardando datos del usuario en localStorage:', { token, userLevel, username });
    localStorage.setItem('token', token);
    localStorage.setItem('userLevel', userLevel.toString());
    localStorage.setItem('username', username);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    //console.log('🔑 Obteniendo token:', token);
    return token;
  }

  getUserLevel(): number {
    const level = localStorage.getItem('userLevel');
    //console.log('📊 Obteniendo userLevel:', level);
    return level ? parseInt(level) : 0; // 0 = bloqueado
  }

  getUsername(): string | null {
    const username = localStorage.getItem('username');
    //console.log('👤 Obteniendo username:', username);
    return username;
  }

  logout(): void {
    console.log('🚪 Cerrando sesión, limpiando localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const authenticated = this.getToken() !== null && this.getUserLevel() > 0;
    //console.log('✅ isAuthenticated:', authenticated);
    return authenticated;
  }

  isAdmin(): boolean {
    const admin = this.getUserLevel() === 2;
    //console.log('🛠️ isAdmin:', admin);
    return admin;
  }

  isSeller(): boolean {
    const seller = this.getUserLevel() === 1;
    //console.log('💼 isSeller:', seller);
    return seller;
  }

  isBlocked(): boolean {
    const blocked = this.getUserLevel() === 0;
    //console.log('⛔ isBlocked:', blocked);
    return blocked;
  }

  removeToken(): void {
    //console.log('🗑️ Eliminando token de localStorage');
    localStorage.removeItem('token');
  }

    getUserResumen(): any {
    const token = this.getToken();
    const userLevel = this.getUserLevel();
    const username = this.getUsername();
    
    const summary = {
      isAuthenticated: this.isAuthenticated(),
      isAdmin: this.isAdmin(),
      isSeller: this.isSeller(),
      isBlocked: this.isBlocked(),
      userData: {
        //token: token ? `${token.substring(0, 20)}...` : 'No disponible',
        //tokenLength: token ? token.length : 0,
        userLevel: userLevel,
        userLevelDescription: this.getUserLevelDescription(userLevel),
        username: username || 'No disponible'
      },
      status: this.getUserStatus()
    };
    
    console.log('📋 Resumen del usuario:', summary);
    return summary;
  }

  // Método auxiliar para describir el nivel de usuario
  private getUserLevelDescription(level: number): string {
    switch(level) {
      case 0: return 'Bloqueado';
      case 1: return 'Encargado';
      case 2: return 'Administrador';
      default: return 'Desconocido';
    }
  }

  // Método para obtener el estado general del usuario
  getUserStatus(): string {
    if (!this.isAuthenticated()) {
      return 'No autenticado';
    }
    
    if (this.isBlocked()) {
      return 'Usuario bloqueado';
    }
    
    if (this.isAdmin()) {
      return 'Administrador autenticado';
    }
    
    if (this.isSeller()) {
      return 'Vendedor autenticado';
    }
    
    return 'Usuario autenticado';
  }

  // Método para mostrar el resumen en la consola de forma formateada
  printUserResumen(): void {
    const resumen = this.getUserResumen();
    
    console.log('👤 RESUMEN DEL USUARIO 👤');
    console.log('──────────────────────────');
    console.log(`✅ Autenticado: ${resumen.isAuthenticated ? 'Sí' : 'No'}`);
    console.log(`🛠️ Administrador: ${resumen.isAdmin ? 'Sí' : 'No'}`);
    console.log(`💼 Vendedor: ${resumen.isSeller ? 'Sí' : 'No'}`);
    console.log(`⛔ Bloqueado: ${resumen.isBlocked ? 'Sí' : 'No'}`);
    console.log('──────────────────────────');
    //console.log(`🔑 Token: ${resumen.userData.token}`);
    console.log(`📊 Nivel: ${resumen.userData.userLevel} (${resumen.userData.userLevelDescription})`);
    console.log(`👤 Nombre: ${resumen.userData.username}`);
    console.log(`📋 Estado: ${resumen.status}`);
    console.log('──────────────────────────');
  }

  // Método para verificar rápidamente el estado de autenticación
  getQuickStatus(): string {
    if (!this.getToken()) {
      return '❌ Sin token - No autenticado';
    }
    
    const level = this.getUserLevel();
    const name = this.getUsername();
    
    return `${this.isAuthenticated() ? '✅' : '❌'} ${name || 'Usuario'} - Nivel ${level}`;
  }

}