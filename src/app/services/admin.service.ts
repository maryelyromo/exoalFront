import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from './revisor.service';
import { ProyectoExtendido } from '../components/cierreproyectos/cierreproyectos.component';

export interface adminUser{
  ID_USUARIO: number;
  NOMBRE: string;
  APELLIDOS: string;
  EMAIL: string;
  PERMISOS: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'http://localhost:3000/admin/';
  constructor(private http: HttpClient) { }
  
  getEnespera() {
    return this.http.get<{ proyectos: Proyecto[] }>(this.url + 'enespera');
  }

  setUpdateStatus(id_proyecto: number, status: string){
    return this.http.post(this.url + 'updateStatus', {id_proyecto, status});
  }

  getUsers() {
    return this.http.get< adminUser[] >(this.url + 'getUsers');
  }

  updateUserStatus(id_usuario: number, permiso: string) {
    return this.http.post(this.url + 'updateUserStatus', {id_usuario, permiso});
  }

  mostrarProyectosFinalizados() {
    return this.http.get<ProyectoExtendido[]>(this.url + 'proyectosFinalizados');
  }

  cambiarPassword(id_usuario: number, oldPassword: string, newPassword: string) {
    return this.http.post(this.url + 'cambioPass', { id_usuario:id_usuario, antigua_contra:oldPassword, nueva_contra:newPassword });
  }

}

