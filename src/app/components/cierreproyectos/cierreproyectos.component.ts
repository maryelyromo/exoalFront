import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Criterios, Proyecto } from 'src/app/services/revisor.service';

@Component({
  selector: 'app-cierreproyectos',
  templateUrl: './cierreproyectos.component.html',
  styleUrls: ['./cierreproyectos.component.css']
})
export class CierreproyectosComponent implements OnInit {

  proyectos: ProyectoExtendido[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }
  cargarProyectos(): void {
    this.adminService.getEnespera().subscribe((data: any) => {
      console.log('Respuesta del backend:', data);

      if (Array.isArray(data)) {
        // Caso 1: el backend devuelve directamente un array de proyectos
        this.proyectos = data.map(proyecto => ({
          ...proyecto,
          criterios: (proyecto as any).criterios ?? [],
          ID_REVISOR: (proyecto as any).ID_REVISOR ?? 0
        }));
      } else if (data && typeof data === 'object' && 'proyectos' in data && Array.isArray(data.proyectos)) {
        // Caso 2: el backend devuelve { proyectos: [...] }
        this.proyectos = data.proyectos.map((proyecto: any) => ({
          ...proyecto,
          criterios: (proyecto as any).criterios ?? [],
          ID_REVISOR: (proyecto as any).ID_REVISOR ?? 0
        }));
      } else {
        console.error('❌ La estructura del backend no es la esperada o es null:', data);
        this.proyectos = [];
      }
    });
  }

  getSeccionesProyecto(proyecto: ProyectoExtendido): { titulo: string, contenido: string }[] {
    return [
      { titulo: 'Antecedentes', contenido: proyecto.ANTECEDENTES },
      { titulo: 'Justificación', contenido: proyecto.JUSTIFICACION },
      { titulo: 'Objetivo General', contenido: proyecto.OBJ_GRAL },
      { titulo: 'Objetivos Específicos', contenido: proyecto.OBJ_ESP },
      { titulo: 'Información Adicional', contenido: proyecto.INFO_ADD },
      { titulo: 'Entregables', contenido: proyecto.ENTREGABLES },
      { titulo: 'Adjuntos', contenido: proyecto.ADJUNTAR }
    ];
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }


  aceptarProyecto(id: number): void {
    //console.log(`Proyecto con ID ${id} aceptado`);
    // Aquí puedes hacer una petición para actualizar estado del proyecto si lo necesitas
    let confirm = window.confirm(" ¿Estás seguro de que deseas aceptar este proyecto?");
    if (confirm) {
      this.adminService.setUpdateStatus(id, 'Aceptado').subscribe(() => {
        // Actualiza el estado del proyecto en la lista
        const proyecto = this.proyectos.find(p => p.ID_PROYECTO === id);
        this.cargarProyectos();
        if (proyecto) {
          proyecto.ESTADO = 'Aceptado';
        }
      });

    }
    this.cargarProyectos();
  }
  rechazarProyecto(id: number): void {
    //console.log(`Proyecto con ID ${id} rechazado`);
    // Aquí puedes hacer una petición para actualizar estado del proyecto si lo necesitas
    let confirm = window.confirm("❌ ¿Estás seguro de que deseas rechazar este proyecto?");
    if (confirm) {
      this.adminService.setUpdateStatus(id, 'Rechazado').subscribe(() => {
        // Actualiza el estado del proyecto en la lista
        const proyecto = this.proyectos.find(p => p.ID_PROYECTO === id);
        this.cargarProyectos();
        if (proyecto) {
          proyecto.ESTADO = 'Rechazado';
        }
      });
    }
  }
}

/** INTERFACES */

export interface ProyectoExtendido {
  ID_PROYECTO: number;
  NAME_PROYECT: string;
  DISCIPLINA: string;
  ESTADO: string;
  MONTO: number;
  PROGAMA: string;
  ANTECEDENTES: string;
  JUSTIFICACION: string;
  OBJ_GRAL: string;
  OBJ_ESP: string;
  INFO_ADD: string;
  ENTREGABLES: string;
  ADJUNTAR: string;
  ID_SUSTENTANTE: number;
  ID_REVISOR: number;
  criterios: Criterios[];
}
