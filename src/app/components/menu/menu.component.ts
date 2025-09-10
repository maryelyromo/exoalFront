import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  userRole: string = '';
  dropdownOpen = false;

  private roleSubscription!: Subscription;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    // Suscribirse al BehaviorSubject para recibir cambios en el rol
    this.roleSubscription = this.loginService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  salir() {
    this.loginService.logout();
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnDestroy() {
    // Para evitar memory leaks, cancelar la suscripción cuando el componente se destruye
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
}