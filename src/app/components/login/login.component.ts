import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: LoginService, private router: Router) {}

login() {
  this.errorMessage = '';

  this.authService.login({ numemp: this.username, contrasena: this.password })
    .subscribe({
      next: (response: any) => {
        if (response?.token && response?.usuario) {
          console.log('Login exitoso:', response.username);
          this.router.navigate(['/inicio']);
        } else {
          this.errorMessage = 'Estructura de respuesta inválida';
          console.error('Estructura de respuesta incorrecta:', response);
        }
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.errorMessage = err.error?.message || 'Error al conectar con el servidor';
        alert(`Error: ${this.errorMessage}`);
      }
    });
}
  createUser(): void {
    this.router.navigate(['/createuser']);
  }
}