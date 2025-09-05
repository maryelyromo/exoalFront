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


}
