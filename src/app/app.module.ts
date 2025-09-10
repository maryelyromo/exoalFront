import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './interceptors/login.interceptor';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NuevoproyectoComponent } from './components/nuevoproyecto/nuevoproyecto.component';
import { SelectproyectoComponent } from './components/selectproyecto/selectproyecto.component';
import { RevisionproyectoComponent } from './components/revisionproyecto/revisionproyecto.component';
import { AdmincuentasComponent } from './components/admincuentas/admincuentas.component';
import { ProyectosrevisadosComponent } from './components/proyectosrevisados/proyectosrevisados.component';
import { FooterComponent } from './components/footer/footer.component';
import { CierreproyectosComponent } from './components/cierreproyectos/cierreproyectos.component';
import { MisproyectosComponent } from './components/misproyectos/misproyectos.component';
import { CpasswordComponent } from './components/cpassword/cpassword.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    InicioComponent,
    RegistroComponent,
    NuevoproyectoComponent,
    SelectproyectoComponent,
    RevisionproyectoComponent,
    AdmincuentasComponent,
    ProyectosrevisadosComponent,
    FooterComponent,
    CierreproyectosComponent,
    MisproyectosComponent,
    CpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
