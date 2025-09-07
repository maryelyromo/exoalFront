import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuserService } from 'src/app/services/nuser.service';
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

@Component({
  selector: 'app-nuevoproyecto',
  templateUrl: './nuevoproyecto.component.html',
  styleUrls: ['./nuevoproyecto.component.css']
})
export class NuevoproyectoComponent implements OnInit {
    proyectoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private proyeto:NuserService,
    private router: Router
  ) {
    this.proyectoForm = this.fb.group({
      DISCIPLINA: ['', Validators.required],
      NAME_PROYECT: ['', Validators.required],
      JUSTIFICACION: ['', Validators.required],
      ANTECEDENTES: ['', Validators.required],
      OBJ_GRAL: ['', Validators.required],
      OBJ_ESP: ['', Validators.required],
      ENTREGABLES: ['', [Validators.required, Validators.maxLength(500)]],
      MONTO: [0, [Validators.required, Validators.min(0)]],
      PROGAMA: ['', Validators.required],
      ADJUNTAR: [''],
      INFO_ADD: [''],
      ESTADO: ['Pendiente'], // Valor por defecto
      ID_REVISOR: [null],
      ID_SUSTENTANTE: [localStorage.getItem('userId')]
    });
  }
  ngOnInit(): void {
  const userId = localStorage.getItem('userId');
  console.log('User ID:', userId);

this.proyeto.dataProyecto().subscribe({
  next: (response) => {
    if (response && response.data && Object.keys(response.data).length > 0) {
      console.log('✔️ Proyecto existente:', response.data);
      this.proyectoForm.patchValue(response.data);

      setTimeout(() => {
        this.proyectoForm.disable();
      }, 0);
    } else {
      console.log('ℹ️ No hay proyecto existente. Formulario habilitado para crear uno nuevo.');
      this.proyectoForm.enable();
    }
  },
  error: (error) => {
    console.error('❌ Error al obtener datos del proyecto:', error);
    //alert('⚠️ Puedes registrar un nuevo proyecto.');
  }
});
}

  onSubmit() {
  if (this.proyectoForm.disabled) {
    alert('⚠️ Ya existe un proyecto. No puedes crear uno nuevo.');
    return;
  }

  if (this.proyectoForm.invalid) {
    this.proyectoForm.markAllAsTouched();
    return;
  }

  const proyecto: Proyecto = this.proyectoForm.value;

  this.proyeto.crearProyecto(proyecto).subscribe({
    next: (response) => {
      alert(`✔️ Proyecto creado con ID: ${response.id}`);
      this.proyectoForm.reset();
      this.router.navigate(['/inicio']);
    },
    error: (error) => {
      console.error('❌ Error al crear proyecto:', error);
      alert('❌ Ocurrió un error al crear el proyecto.');
    }
  });
}
}
