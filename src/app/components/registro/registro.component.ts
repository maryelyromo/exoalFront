import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuserService } from 'src/app/services/nuser.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
   usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private user: NuserService, private router: Router) {
    this.usuarioForm = this.fb.group({
      contra: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContra: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      correo: ['', [Validators.required, Validators.email]],
      grado: ['', Validators.required],
      cargo: ['', Validators.required],
      area_adscripcion: ['', Validators.required],
    }, { validators: this.passwordsIguales });
  }

  // Validator personalizado para verificar que contra y confirmarContra sean iguales
  passwordsIguales(group: AbstractControl) {
    const pass = group.get('contra')?.value;
    const confirmPass = group.get('confirmarContra')?.value;
    return pass === confirmPass ? null : { passwordMismatch: true };
  }

  onSubmit() {
  if (this.usuarioForm.valid) {
    this.user.crearUsuario(this.usuarioForm.value).subscribe({
      next: (response) => {
        console.log('✔️ Usuario creado con éxito:', response);
        // Mostrar alerta con el ID del usuario creado
        alert(`✔️ Usuario creado exitosamente.\nID asignado: ${response.id}\nPor favor, guarda este ID para futuras referencias.`);
        this.router.navigate(['/login']);
        alert('💡 Inicia sesión con tus credenciales.');
        // Limpiar el formulario
        this.usuarioForm.reset();
      },
      error: (error) => {
        console.error('❌ Error al crear el usuario:', error);
        alert('❌ Ocurrió un error al crear el usuario. Intenta nuevamente.');
      }
    });
  } else {
    this.usuarioForm.markAllAsTouched();
  }
}
}
