import { MatTableDataSource } from '@angular/material/table';
import { ResultadoExamenAdmisionService } from './../../../shared/services/resultado-examen-admision.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import Swal from 'sweetalert2';
import { FormresultadoExamenAdmisionComponent } from './formresultado-examen-admision.component';

@Component({
  selector: 'app-resultado-examen-admision',
  templateUrl: './resultado-examen-admision.component.html',
  styleUrls: ['./resultado-examen-admision.component.css']
})
export class ResultadoExamenAdmisionComponent implements OnInit {
  displayColumns: string[] = ['noExpediente', 'anio', 'descripcion', 'nota', 'acciones'];
  dataSource = new MatTableDataSource<ResultadoExamenAdmisionElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private resultadoExamenAdmisionService: ResultadoExamenAdmisionService, public dialog: MatDialog, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.getResultadoExamenAdmision();
  }

  openExamenAdmisionComponent() {
    const dialogRef = this.dialog.open(FormresultadoExamenAdmisionComponent, {width: '450px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Resultado Examen Admisión', 'Registro almacenado correctamente', 'success');
        this.getResultadoExamenAdmision();
      } else if (result == 2) {
        Swal.fire('Resultado Examen Admisión', 'Error al agregar el registro', 'error');
      }
    })
  }

  getResultadoExamenAdmision() {
    this.resultadoExamenAdmisionService.getResultadoExamenAdmision().subscribe(data => {
      console.log(data);
      this.processResultadoExamenAdmisionResponse(data);
    });
  }

  deleteResultadoExamenAdmision(noExpediente: any, anio: any) {
    Swal.fire({
      title: 'Resultado Examen Admisión',
      text: '¿Esta seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.resultadoExamenAdmisionService.deleteResultadoExamenAdmision(noExpediente, anio).subscribe((data: any) => {
          if (data.httpStatusCode == 503) {
            Swal.fire('Resultado Examen Admisión', data.mensaje, 'error');
          } else {
            Swal.fire('Resultado Examen Admisión', 'Registro eliminado', 'success');
          }
          this.getResultadoExamenAdmision();
        })
      }
    })
  }

  editResultadoExamenAdmision(noExpediente: string, anio: string, descripcion: string, nota: number) {
    const aspiranteResultado = false;
    const dialogRef = this.dialog.open(FormresultadoExamenAdmisionComponent, {
      width: '450px',
      data: {noExpediente: noExpediente, anio: anio, descripcion: descripcion, nota: nota, aspiranteResultado: aspiranteResultado}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Resultado Examen Admisión', 'Registro almacenado correctamente', 'success');
        this.getResultadoExamenAdmision();
      } else if (result == 2) {
        Swal.fire('Resultado Examen Admisión','Ups!!! se genero un error al modificar el registro', 'error');
      }
    });
  }

  processResultadoExamenAdmisionResponse(data: any) {
    const dataResultadoExamenAdmision: ResultadoExamenAdmisionElement[] = [];
    let listResultadoExamenAdmision = data;
    listResultadoExamenAdmision.forEach((element: ResultadoExamenAdmisionElement) => {
      dataResultadoExamenAdmision.push(element);
    });
    this.dataSource = new MatTableDataSource<ResultadoExamenAdmisionElement>(dataResultadoExamenAdmision);
    this.dataSource.paginator = this.paginator;
  }
}

export interface ResultadoExamenAdmisionElement {
  noExpediente: string,
  anio: string,
  descripcion: string,
  nota: number
}
