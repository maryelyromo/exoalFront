import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NuevoproyectoComponent } from './components/nuevoproyecto/nuevoproyecto.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'inicio', 
    component: InicioComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Administrador', 'Sustentante', 'Revisor'] } // Solo estos pueden entrar
  },
   { 
    path: 'registro', 
    component: RegistroComponent, 
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Administrador', 'Sustentante', 'Revisor'] } // Solo estos pueden entrar
  },
  { 
    path: 'crearProyecto', 
    component: NuevoproyectoComponent, 
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