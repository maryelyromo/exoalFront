import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
export interface Proyecto {
  ID_PROYECTO: number;
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

export interface Criterios {
  ID_PROYECTO: number;
  RELACION: string;
  EXTENSION: string;
  DISENO: string;
  RIESGOS: string;
  FORMA: string;
  ANALISIS: string;
  RECOMENDACIONES: string;
  ID_REVISOR: number;
}

@Injectable({
  providedIn: 'root'
})
export class RevisorService {
  private bduser= 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  
  getProyectos(){
    return this.http.get<Proyecto[]>(this.bduser + 'data/proyectos');
  }

  setRevisor(id_revisor: number, id_proyecto: number){
    return this.http.post(this.bduser + 'asignarRevisor', {id_revisor, id_proyecto});
  }

  getProyectoarevisar(id_revisor: number): Observable<Proyecto[]> {
    return this.http.post<Proyecto[]>(this.bduser + 'data/proyectoarevisar', { id_revisor });
  }

  revisorActivo(id_revisor: number): Observable<any> {
  return this.http.post<any>(this.bduser + 'revisorActivo', { id_revisor });
  }

  setCriterios(criterios: Criterios){
    return this.http.post(this.bduser + 'data/proyectoRevisado', criterios);
  }

}
