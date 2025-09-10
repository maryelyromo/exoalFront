import { Component, OnInit } from '@angular/core';
import { AdminService, adminUser } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admincuentas',
  templateUrl: './admincuentas.component.html',
  styleUrls: ['./admincuentas.component.css']
})
export class AdmincuentasComponent implements OnInit {
  usuarios: adminUser[] = [];

  permisos = [
    { nombre: 'Administrador', valor: 'Administrador', icono: 'bi bi-shield-lock' },
    { nombre: 'Revisor', valor: 'Revisor', icono: 'bi bi-eye' },
    { nombre: 'Sustentante', valor: 'Sustentante', icono: 'bi bi-person-check' },
    { nombre: 'Bloqueado', valor: 'Bloqueado', icono: 'bi bi-lock' }
  ];
  filtroBusqueda: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.adminService.getUsers().subscribe(
      (response) => {
        this.usuarios = response;
        console.log('Usuarios obtenidos:', this.usuarios);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  cambiarPermiso(usuario: adminUser, nuevoPermiso: string): void {
    if (usuario.PERMISOS === nuevoPermiso) {
      return; // No cambiar si ya tiene ese permiso
    }

    this.adminService.updateUserStatus(usuario.ID_USUARIO, nuevoPermiso).subscribe(
      () => {
        console.log(`Permiso del usuario ${usuario.ID_USUARIO} actualizado a ${nuevoPermiso}`);
        usuario.PERMISOS = nuevoPermiso;
      },
      (error) => {
        console.error('Error al actualizar el permiso del usuario:', error);
      }
    );
  }
  usuariosFiltrados(): adminUser[] {
    if (!this.filtroBusqueda) return this.usuarios;
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.usuarios.filter(usuario =>
      usuario.NOMBRE.toLowerCase().includes(filtro) ||
      usuario.APELLIDOS.toLowerCase().includes(filtro) ||
      usuario.ID_USUARIO.toString().includes(filtro) ||
      usuario.PERMISOS.toLowerCase().includes(filtro)
    );
  }
  getPermisoIcon(permiso: string): string {
    const found = this.permisos.find(p => p.valor === permiso);
    return found ? found.icono : 'bi bi-question-circle';
  }

  getBadgeClass(permiso: string): string {
    switch (permiso) {
      case 'Administrador':
        return 'badge bg-success';
      case 'Revisor':
        return 'badge bg-warning text-white';
      case 'Sustentante':
        return 'badge bg-primary';
      case 'Bloqueado':
        return 'badge bg-danger';
      default:
        return 'badge bg-light text-dark';
    }
  }

  getButtonClass(actual: string, valor: string): string {
    const base = 'btn';
    if (actual === valor) {
      switch (valor) {
        case 'Administrador': return `${base} btn-success`;
        case 'Revisor': return `${base} btn-warning text-white`;
        case 'Sustentante': return `${base} btn-primary`;
        case 'Bloqueado': return `${base} btn-danger`;
        default: return `${base} btn-outline-dark`;
      }
    } else {
      return `${base} btn-outline-secondary`;
    }
  }

}
