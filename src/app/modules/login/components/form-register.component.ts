import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Usuario } from '../../usuario/model/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  public formRegister: FormGroup;
  usuario: Usuario = new Usuario();
  hide = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private dialogRef: MatDialogRef<FormRegisterComponent>){
    this.formRegister = formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      normalizedUserName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  create() {
    this.usuario.username = this.formRegister.get('userName')?.value;
    this.usuario.email = this.formRegister.get('email')?.value;
    this.usuario.normalizedUserName = this.formRegister.get('normalizedUserName')?.value;
    this.usuario.password = this.formRegister.get('password')?.value;
    this.usuario.roles.push('ROLE_USER');
    console.log(this.usuario);
    this.authService.register(this.usuario).subscribe(response => {
      const payload = this.authService.getToken(response.token);
      this.authService.saveToken(response.token);
      this.authService.saveUser(payload);
      Swal.fire({
        icon: 'success',
        title: 'Cuenta creada exitosamente',
        text: `La cuenta ${payload.username} fue creada exitosamente`,
        footer: 'Kalum v1.0.0'
      }).then(result => {
        if (result.isConfirmed) {
          this.router.navigate(['/dashboard/home']);
          this.dialogRef.close(1);
        }
      });
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Crear cuenta',
        text: 'Existe un problema al momento de crear la cuenta',
        footer: 'Kalum v1.0.0'
      });
    });
  }

  close() {
    this.dialogRef.close(2);
  }

}
