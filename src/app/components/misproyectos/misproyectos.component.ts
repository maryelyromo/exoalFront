import { Component } from '@angular/core';
import { ProyectoExtendido } from '../cierreproyectos/cierreproyectos.component';
import { NuserService } from 'src/app/services/nuser.service';

@Component({
  selector: 'app-misproyectos',
  templateUrl: './misproyectos.component.html',
  styleUrls: ['./misproyectos.component.css']
})
export class MisproyectosComponent {
      proyectos: ProyectoExtendido[] = [];
    
      constructor(private adminService: NuserService) { }
    
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
