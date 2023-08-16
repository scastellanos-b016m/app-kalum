import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { FormLoginComponent } from "../../login/components/form-login.component";
import { UpdateIdentification } from "../../login/model/update-identification.model";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  updateIdentification: UpdateIdentification = new UpdateIdentification();

  constructor(private authService: AuthService, private dialogRef: MatDialog) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    Swal.fire({
      icon: 'warning',
      title: 'Login',
      text: `Es necesario que inicie sesión para completar este proceso`,
      footer: 'Kalum v1.0.0'
    }).then(result => {
      if (result.isConfirmed) {
        if (next.params) {
          let params: any = next.queryParams;
          if (params.type && params.identificationId) {
            this.updateIdentification.type = params.type;
            this.updateIdentification.identificationId = params.identificationId;
            this.dialogRef.open(FormLoginComponent, {
              width: '450px',
              data: this.updateIdentification
            });
          } else {
            this.dialogRef.open(FormLoginComponent, {
              width: '450px'
            });
          }
        } else {
          this.dialogRef.open(FormLoginComponent, {
            width: '450px'
          });
        }
      }
    });
    return false;
  }
}
