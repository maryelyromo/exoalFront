import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NuevoproyectoComponent } from './components/nuevoproyecto/nuevoproyecto.component';
import { SelectproyectoComponent } from './components/selectproyecto/selectproyecto.component';
import { RevisionproyectoComponent } from './components/revisionproyecto/revisionproyecto.component';
import { CierreproyectosComponent } from './components/cierreproyectos/cierreproyectos.component';
import { AdmincuentasComponent } from './components/admincuentas/admincuentas.component';
import { ProyectosrevisadosComponent } from './components/proyectosrevisados/proyectosrevisados.component';
import { MisproyectosComponent } from './components/misproyectos/misproyectos.component';
import { CpasswordComponent } from './components/cpassword/cpassword.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //Componente al que todos pueden acceder
  { 
    path: 'inicio', 
    component: InicioComponent }, // Todos pueden entrar
   { 
    path: 'registro', 
    component: RegistroComponent,   // Todos pueden entrar
  },
  { 
    path: 'crearProyecto', 
    component: NuevoproyectoComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: [ 'Sustentante' ] } // Solo sustentante puede entrar
  },
  { 
    path: 'selectProyecto', 
    component: SelectproyectoComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: [ 'Revisor'] } // Solo estos pueden entrar
  },
  { 
    path: 'revisionProyecto', 
    component: RevisionproyectoComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Revisor'] } // Solo estos pueden entrar
  },
  { 
    path: 'cierreProyectos', 
    component: CierreproyectosComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Administrador'] } // Solo estos pueden entrar
  },
    { 
    path: 'adminUsers', 
    component: AdmincuentasComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Administrador'] } // Solo estos pueden entrar
  },
     { 
    path: 'proyectosRevisados', 
    component: ProyectosrevisadosComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Administrador' ] } // Solo estos pueden entrar
  },
  { 
    path: 'misProyectos', 
    component: MisproyectosComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Sustentante'] } // Solo estos pueden entrar
  },
   { 
    path: 'cpassword', 
    component: CpasswordComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Administrador', 'Sustentante', 'Revisor'] } // Solo estos pueden entrar
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}