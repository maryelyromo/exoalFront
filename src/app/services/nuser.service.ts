import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Usuario {
  nombre: string;
  apellidos: string;
  telefono: string;
  correo: string;
  grado: string;
  cargo: string;
  area_adscripcion: string;
  contra: string;
  confirmarContra: string;
}
export interface Proyecto {
  DISCIPLINA: string;
  NAME_PROYECT: string;
  JUSTIFICACION: string;
  ANTECEDENTES: string;
  OBJ_GRAL: string;
  OBJ_ESP: string;
  ENTREGABLES: string;
  MONTO: number;
  PROGAMA: string;
  ADJUNTAR: string;
  INFO_ADD: string;
  ESTADO: string;
  ID_REVISOR: number | null;
  ID_SUSTENTANTE: number;
}

@Injectable({
  providedIn: 'root'
})
export class NuserService {
  private bduser= 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
    
  sendUser(user: string,contra:string):Observable<any>{
    return this.http.post(this.bduser,{user,contra});
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.bduser + 'crearuser', usuario)
      .pipe(
        catchError(this.manejarError)
      );
  }
  private manejarError(error: HttpErrorResponse) {
    // Aquí puedes mejorar el manejo de errores
    console.error('Error en la petición:', error);
    return throwError(() => new Error('Error en la comunicación con el servidor'));
  }
  crearProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.post<any>(this.bduser + 'nuevoProyecto', proyecto)
      .pipe(
        catchError(this.manejarError)
      );
  }
  dataProyecto(): Observable<any> {
  return this.http.post<any>(this.bduser + 'data/proyecto', { ID_SUSTENTANTE: localStorage.getItem('userId') })
    .pipe(
      catchError(this.manejarError)
    );
  }
}
