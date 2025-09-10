import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cpassword',
  templateUrl: './cpassword.component.html',
  styleUrls: ['./cpassword.component.css']
})
export class CpasswordComponent {
  username: string = '';
  password: string = '';
  newpassword: string = '';
  confirmPassword: string = '';

  errorMessage: string = '';
  bandera: boolean = false;

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private admin: AdminService,
    private authService: LoginService
  ) {}

  login(): void {
    this.authService.login({ id: this.username, password: this.password }).subscribe({
      next: (response: any) => {
        if (response?.token && response?.usuario) {
          this.errorMessage = '';
          this.bandera = true;
        } else {
          this.errorMessage = 'Estructura de respuesta inválida';
        }
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Error al conectar con el servidor';
        this.bandera = false;
      }
    });
  }

  cambiarPassword(): void {
    if (!this.newpassword || this.newpassword.length < 6) {
      this.errorMessage = 'La nueva contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (this.newpassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const id_usuario = Number(this.username);
    if (isNaN(id_usuario)) {
      this.errorMessage = 'El ID del usuario no es válido';
      return;
    }

    this.admin.cambiarPassword(id_usuario, this.password, this.newpassword).subscribe({
      next: () => {
        alert('✅ Contraseña actualizada con éxito');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'No se pudo cambiar la contraseña';
      }
    });
  }
}
