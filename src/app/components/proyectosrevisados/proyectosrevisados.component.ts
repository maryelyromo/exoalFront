import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProyectoExtendido } from '../cierreproyectos/cierreproyectos.component';
import { Criterios } from 'src/app/services/revisor.service';

@Component({
  selector: 'app-proyectosrevisados',
  templateUrl: './proyectosrevisados.component.html',
  styleUrls: ['./proyectosrevisados.component.css']
})
export class ProyectosrevisadosComponent implements OnInit {

  proyectos: ProyectoExtendido[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.mostrarProyectosFinalizados().subscribe(response => {
      this.proyectos = response;
      console.log(this.proyectos);
    });
  }

  getCamposProyecto(proyecto: any) {
    return [
      { titulo: 'Disciplina', contenido: proyecto.DISCIPLINA },
      { titulo: 'Programa', contenido: proyecto.PROGAMA },
      { titulo: 'Objetivo General', contenido: proyecto.OBJ_GRAL },
      { titulo: 'Objetivos Específicos', contenido: proyecto.OBJ_ESP },
      { titulo: 'Justificación', contenido: proyecto.JUSTIFICACION },
      { titulo: 'Antecedentes', contenido: proyecto.ANTECEDENTES },
      { titulo: 'Información Adicional', contenido: proyecto.INFO_ADD },
      { titulo: 'Entregables', contenido: proyecto.ENTREGABLES },
      { titulo: 'Monto solicitado', contenido: '$' + proyecto.MONTO },
    ];
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'Aceptado': return 'bg-success text-white';
      case 'Rechazado': return 'bg-danger text-white';
      case 'Pendiente': return 'bg-warning text-dark';
      default: return 'bg-secondary text-white';
    }
  }

  getEstadoIcon(estado: string): string {
    switch (estado) {
      case 'Aceptado': return 'bi bi-check-circle-fill';
      case 'Rechazado': return 'bi bi-x-circle-fill';
      case 'Pendiente': return 'bi bi-hourglass-split';
      default: return 'bi bi-question-circle-fill';
    }
  }
  getCriterioIconoClase(valor: string | undefined): { icono: string; color: string } {
  switch (valor) {
    case 'Excelente':
      return { icono: 'bi-check-circle-fill', color: 'text-success' };
    case 'Satisfactorio':
      return { icono: 'bi-hand-thumbs-up-fill', color: 'text-primary' };
    case 'En progreso':
      return { icono: 'bi-hourglass-split', color: 'text-warning' };
    case 'Iniciado':
      return { icono: 'bi-play-circle-fill', color: 'text-secondary' };
    default:
      return { icono: 'bi-exclamation-circle-fill', color: 'text-danger' };
  }
}

}
