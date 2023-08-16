import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import { FormCarreraTecnicaComponent } from './form-carrera-tecnica.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { FormRegisterAspiranteComponent } from 'src/app/modules/aspirante/components/form-register-aspirante.component';
import { FormLoginComponent } from 'src/app/modules/login/components/form-login.component';
import { AspiranteService } from 'src/app/modules/shared/services/aspirante.service';
import { DatePipe } from '@angular/common';
import { FormRegisterAlumnoComponent } from 'src/app/modules/alumno/components/form-register-alumno.component';

@Component({
  selector: 'app-carrera-tecnica',
  templateUrl: './carrera-tecnica.component.html',
  styleUrls: ['./carrera-tecnica.component.css']
})
export class CarreraTecnicaComponent implements OnInit {
  displayColumns: string[] = ['number', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<CarreraTecnicaElement>();
  pipe = new DatePipe('en-US');

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private carreraTecnicaService: CarreraTecnicaService, public dialog: MatDialog,
    public authService: AuthService, private aspiranteService: AspiranteService) {

  }

  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }

  openFormRegisterAspirante(carreraId: string, nombre: string) {
    if (this.authService.isAuthenticated()) {
      if (this.authService.usuario.identificationId == '0') {
        const formRegisterAspiranteRef = this.dialog.open(FormRegisterAspiranteComponent, {
          width: '450px',
          data: { email: this.authService.usuario.email, carreraId: carreraId }
        });
      } else {
        if (this.authService.hasRole('ROLE_CANDIDATE')) {
          this.aspiranteService.getAspiranteByExpediente(this.authService.usuario.identificationId).subscribe((data:any) => {
            console.log(data);
            if (data.estatus == "NO ASIGNADO") {
              Swal.fire({
                icon: 'error',
                title: 'Inscripción',
                html: `<b><span style="color:#303F9F">${data.apellido} ${data.nombre}</span></b> <hr> Actualmente tiene una solicitud pendiente, el estatus actual es <b><span style="color:#FF0000">${data.estatus}</span></b><hr> ${data.carrerasTecnica.nombre}<br>${this.pipe.transform(data.examenAdmision.fechaExamen, 'dd/MM/yyyy HH:mm:ss')}`,
                footer: 'Kalum v1.0.0'
              });
            } else if (data.estatus == "NO SIGUE PROCESO DE ADMISION") {
              Swal.fire({
                icon: 'error',
                title: 'Inscripción',
                html: `El estatus actual de su solicitud es <br> <hr> <b> <span style="color:#FF0000">${data.estatus}</span></b>`,
                footer: 'Kalum v1.0.0'
              });
            } else if (data.estatus == "SIGUE PROCESO DE ADMISION") {
              //TAREA FINAL
              // this.dialog.open(FormRegisterAlumnoComponent, {
              //   width: '450px'
              // });
              const formRegisterAlumnoRef = this.dialog.open(FormRegisterAlumnoComponent, {
                width: '450px',
                data: { email: this.authService.usuario.email, carreraId: carreraId }
              });
            }
          });
        }
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Carreras técnicas',
        html: `Debes iniciar sesión o crear una cuenta`,
        footer: 'Kalum v1.0.0'
      }).then(result => {
        if (result.isConfirmed) {
          this.dialog.open(FormLoginComponent, {
            width: '450px'
          });
        }
      });
    }
  }

  openFormCarreraTecnica() {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, { width: '450px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Carreras Técnicas', 'Registro almacenado correctamente', 'success');
        this.getCarrerasTecnicas();
      } else if (result == 2) {
        Swal.fire('Carreras Técnicas', 'Error al agregar el registro', 'error');
      }
    })
  }

  getCarrerasTecnicas() {
    this.carreraTecnicaService.getCarrerasTecnicas().subscribe(data => {
      console.log(data);
      this.processCarreraTecnicaResponse(data);
    });
  }

  deleteCarreraTecnica(carreraId: any) {
    Swal.fire({
      title: 'Carreras técnicas',
      text: '¿Esta seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.carreraTecnicaService.deleteCarreraTecnica(carreraId).subscribe((data: any) => {
          // console.log(data.httpStatusCode);
          if (data.httpStatusCode == 503) {
            Swal.fire('Carreras Técnicas', data.mensaje, 'error');
          } else {
            Swal.fire('Carreras Técnicas', 'Registro eliminado', 'success');
          }
          this.getCarrerasTecnicas();
        });
      }
    })
  }

  editCarreraTecnica(carreraId: string, nombre: string) {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, {
      width: '450px',
      data: { carreraId: carreraId, nombre: nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Carreras Técnicas', 'Registro almacenado correctamente', 'success');
        this.getCarrerasTecnicas();
      } else if (result == 2) {
        Swal.fire('Carreras Técnicas', 'Ups!!! se genero un error al modificar el registro', 'error');
      }
    });
  }

  processCarreraTecnicaResponse(data: any) {
    const dataCarreraTecnica: CarreraTecnicaElement[] = [];
    let listCarreraTecnica = data;
    let number = 1;
    listCarreraTecnica.forEach((element: CarreraTecnicaElement) => {
      element.number = number;
      dataCarreraTecnica.push(element);
      number++;
    });
    this.dataSource = new MatTableDataSource<CarreraTecnicaElement>(dataCarreraTecnica);
    this.dataSource.paginator = this.paginator;
  }

}

export interface CarreraTecnicaElement {
  number: number,
  carreraId: string,
  nombre: string
}
