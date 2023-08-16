import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormLoginComponent } from '../../login/components/form-login.component';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) {

  }

  openFormLogin(){
    const dialogRef = this.dialog.open(FormLoginComponent, {width: '450px'});
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated) {
      this.openFormLogin();
      return false;
    }

    let roles = route.data['role'];
    for (const rol of roles) {
      console.log(rol);
      if (this.authService.hasRole(rol)) {
        console.log(rol);
        return true;
      }
    }
    // role.forEach((rol: string)=>{
    //   if (this.authService.hasRole(rol)) {
    //     return true;
    //   }
    // });
    // console.log(roles);
    // if (this.authService.hasRole(roles)) {
    //   return true;
    // }
    Swal.fire({title:'Acceso denegado', text: `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, icon: 'warning'});
    this.router.navigate(['/dashboard/carreraTecnica']);
    return false;
    /*
    CODIGO ORIGINAL
    let role = route.data['role'] as string;
    if (this.authService.hasRole(role)) {
      return true;
    }
    Swal.fire({title:'Acceso denegado', text: `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, icon: 'warning'});
    this.router.navigate(['/dashboard/carreraTecnica']);
    return false;

    */
  }
}
