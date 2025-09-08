import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Criterios, RevisorService } from 'src/app/services/revisor.service';

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

@Component({
  selector: 'app-revisionproyecto',
  templateUrl: './revisionproyecto.component.html',
  styleUrls: ['./revisionproyecto.component.css']
})
export class RevisionproyectoComponent implements OnInit {
  proyectos: Proyecto[] = [];
  evaluacionesForm: FormArray;

  criterios = ['Excelente', 'Satisfactorio', 'En_progreso'];

  constructor(
    private revisorService: RevisorService,
    private fb: FormBuilder
  ) {
    this.evaluacionesForm = this.fb.array([]);
  }

  ngOnInit(): void {
    this.obtenerProyectosARevisar();
  }

  obtenerProyectosARevisar(): void {
    const id_revisor_str = localStorage.getItem('userId');
    const id_revisor = id_revisor_str ? Number(id_revisor_str) : null;

    if (id_revisor !== null && !isNaN(id_revisor)) {
      this.revisorService.getProyectoarevisar(id_revisor).subscribe(
        (data: Proyecto[]) => {
          if (data && data.length > 0) {
            this.proyectos = data;
            this.buildForms();
          } else {
            alert('❗ Ahora no hay proyectos asignados');
            this.proyectos = [{
              ID_PROYECTO: 0,
              DISCIPLINA: 'NA',
              NAME_PROYECT: 'NA',
              JUSTIFICACION: 'NA',
              ANTECEDENTES: 'NA',
              OBJ_GRAL: 'NA',
              OBJ_ESP: 'NA',
              ENTREGABLES: 'NA',
              MONTO: 0,
              PROGAMA: 'NA',
              ADJUNTAR: 'NA',
              INFO_ADD: 'NA',
              ESTADO: 'NA',
              ID_REVISOR: null,
              ID_SUSTENTANTE: 0
            }];
            this.buildForms(true); // Modo solo lectura
          }
        },
        (error) => {
          console.error('Error al obtener proyectos a revisar:', error);
        }
      );
    } else {
      console.error('ID de revisor no válido:', id_revisor_str);
    }
  }
  buildForms(readOnly: boolean = false): void {
    this.evaluacionesForm.clear();
    
    this.proyectos.forEach(() => {
      this.evaluacionesForm.push(this.fb.group({
        RELACION: [{ value: '', disabled: readOnly }, Validators.required],
        EXTENSION: [{ value: '', disabled: readOnly }, Validators.required],
        DISENO: [{ value: '', disabled: readOnly }, Validators.required],
        RIESGOS: [{ value: '', disabled: readOnly }, Validators.required],
        FORMA: [{ value: '', disabled: readOnly }, Validators.required],
        ANALISIS: [{ value: '', disabled: readOnly }, Validators.required],
        RECOMENDACIONES: [{ value: '', disabled: readOnly }]
      }));
    });
  }

  onSubmit(index: number): void {
    const form = this.getFormGroup(index);
      if (form.invalid) return;

      const criterios: Criterios = {
        ID_PROYECTO: this.proyectos[index].ID_PROYECTO,
        ID_REVISOR: this.proyectos[index].ID_REVISOR!,
        RELACION: form.value.RELACION,
        EXTENSION: form.value.EXTENSION,
        DISENO: form.value.DISENO,
        RIESGOS: form.value.RIESGOS,
        FORMA: form.value.FORMA,
        ANALISIS: form.value.ANALISIS,
        RECOMENDACIONES: form.value.RECOMENDACIONES
      };

      this.revisorService.setCriterios(criterios).subscribe({
        next: () => {
          alert('✔️ Evaluación enviada correctamente');
          // Puedes actualizar la lista, redirigir, o quitar el proyecto evaluado del arreglo
          this.obtenerProyectosARevisar(); // Volver a cargar
        },
        error: (err) => {
          console.error('❌ Error al enviar criterios:', err);
          alert('❌ Ocurrió un error al enviar la evaluación');
        }
      });
  }

  getFormGroup(index: number): FormGroup {
    return this.evaluacionesForm.at(index) as FormGroup;
  }
}