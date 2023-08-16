import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormLoginComponent } from 'src/app/modules/login/components/form-login.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: 'Home', route: 'home', icon: 'home', roles: []},
    {name: 'Carreras', route: 'carreraTecnica', icon: 'category', roles: []},
    {name: 'Examenes', route: 'examenAdmision', icon: 'calendar_today', roles: ['ROLE_USER', 'ROLE_CANDIDATE', 'ROLE_STUDENT', 'ROLE_ADMIN']},
    {name: 'Jornadas', route: 'jornada', icon: 'description', roles: ['ROLE_USER', 'ROLE_CANDIDATE', 'ROLE_STUDENT', 'ROLE_ADMIN']},
    {name: 'Aspirantes', route: 'aspirante', icon: 'assignment_ind', roles: ['ROLE_ADMIN']},
    {name: 'Resultado Examenes', route: 'resultadoExamenAdmision', icon: 'assignment_ind', roles: ['ROLE_ADMIN']},
    {name: 'Cuentas por Cobrar', route: 'cuentas-cobrar', icon: 'assignment_ind', roles: ['ROLE_STUDENT']},
    {name: 'Resultado Examenes', route: 'resultadoExamenAdmisionnoexpediente', icon: 'error', roles: ['ROLE_CANDIDATE'], style: 'color: red;'}
  ];

  ngOnInit(): void {
  }

  constructor(media: MediaMatcher, public dialog: MatDialog, public authService: AuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-witdth: 600px)');
  }

  hasRequiredRole(requiredRoles: string[]): boolean {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Si no se especifica ningún rol, mostrar el elemento
    }

    return requiredRoles.some(role => this.authService.hasRole(role));
  }


  openFormLogin(){
    const dialogRef = this.dialog.open(FormLoginComponent, {width: '450px'});
  }

  logout() : void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire({
      title: 'Logout', text: `${username}, has cerado sesión con exito`, icon: 'success'
    }).then(() => {
        this.router.navigate(['/dashboard/home']).then(() => {
          window.location.reload();
        });
    });
  }

}
