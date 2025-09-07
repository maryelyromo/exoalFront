import { Component, OnInit } from '@angular/core';
import { Proyecto, RevisorService } from 'src/app/services/revisor.service';

@Component({
  selector: 'app-selectproyecto',
  templateUrl: './selectproyecto.component.html',
  styleUrls: ['./selectproyecto.component.css']
})
export class SelectproyectoComponent implements OnInit {

  proyectos: Proyecto[] = [];
  proyectosFiltrados: Proyecto[] = [];
  proyectoSeleccionado: Proyecto | null = null;
  busqueda: string = '';
  bandera: boolean = true;

  // Simulando un revisor actual (puedes cambiarlo por autenticación real)
  idRevisor: number = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : 0;

  constructor(private revisorService: RevisorService) {}

  ngOnInit(): void {
    this.cargarProyectos();
    console.log('ID Revisor:', this.idRevisor);
      this.revisorService.revisorActivo(this.idRevisor).subscribe({
      next: (res) => {
        if (!res.disponible) {
          alert("❌ Actualmente no puedes revisar un nuevo proyecto\nTienes un proyecto en revisión."); // Muestra el mensaje del servidor
          //this.proyectos = [];
          //this.proyectosFiltrados = [];
          this.bandera = false;
        } else {
          console.log(res.message); // Revisor disponible
          // Aquí puedes continuar con lógica para asignar proyecto, etc.
        }
      },
      error: (err) => {
        console.error('❌ Error al verificar estado del revisor:', err);
        alert('❌ Error al conectar con el servidor.');
      }
    });

  }

  cargarProyectos(): void {
    this.revisorService.getProyectos().subscribe((data: Proyecto[]) => {
      this.proyectos = data;
      this.proyectosFiltrados = data;
    });
  }

  filtrarProyectos(): void {
    const term = this.busqueda.toLowerCase();
    this.proyectosFiltrados = this.proyectos.filter(p =>
      p.NAME_PROYECT.toLowerCase().includes(term)
    );
  }

  seleccionarProyecto(proyecto: Proyecto): void {
    this.proyectoSeleccionado = proyecto;
  }

  asignarProyecto(): void {
  if (!this.bandera) {
    alert('❗ No puedes asignar un nuevo proyecto hasta que completes el actual.');
    return;
  }
  const proyecto = this.proyectoSeleccionado;
  if (!proyecto) return;

  const confirmar = confirm(`❗ ¿Estás seguro que deseas asignar el proyecto:\n\n📌 "${proyecto.NAME_PROYECT}"\n\nEsta acción no se puede deshacer.`);

  if (!confirmar) {
    return; // el usuario canceló
  }

  console.log('Asignando:', this.idRevisor, proyecto.ID_PROYECTO);

  this.revisorService.setRevisor(this.idRevisor, proyecto.ID_PROYECTO).subscribe({
    next: () => {
      alert(`✔️ ¡Proyecto asignado exitosamente!\n\n🎯 "${proyecto.NAME_PROYECT}" ha sido asignado.`);
      // Reset form
      this.proyectoSeleccionado = null;
      this.busqueda = '';
      this.filtrarProyectos();
      this.cargarProyectos();
    },
    error: (err) => {
      console.error('Error al asignar:', err);
      alert('❌ Hubo un error al asignar el proyecto. Por favor, intenta de nuevo.');
    }
  });

  }
}
