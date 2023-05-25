import { ExamenAdmisionService } from './../../../shared/services/examen-admision.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormExamenAdmisionComponent } from './form-examen-admision.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examen-admision',
  templateUrl: './examen-admision.component.html',
  styleUrls: ['./examen-admision.component.css']
})
export class ExamenAdmisionComponent implements OnInit {
  displayColumns: string[] = ['examenId', 'fechaExamen', 'acciones'];
  dataSource = new MatTableDataSource<ExamenAdmisionElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private ExamenAdmisionService: ExamenAdmisionService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getExamenesAdmision();
  }

  openFormExamenAdmision() {
    const dialogRef = this.dialog.open(FormExamenAdmisionComponent, {width: '450px'});
  }

  getExamenesAdmision() {
    this.ExamenAdmisionService.getExamenesAdmision().subscribe(data => {
      console.log(data);
      this.processExamenesAdmisionResponse(data);
    });
  }

  deleteExamenAdmision(examenId: any) {
    Swal.fire({
      title: 'Examenes Admisión',
      text: '¿Esta seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.ExamenAdmisionService.deleteExamenAdmision(examenId).subscribe((data: any) => {
          if (data.httpStatusCode == 503) {
            Swal.fire('Examenes Admisión', data.mensaje, 'error');
          } else {
            Swal.fire('Examenes Admisión', 'Registro eliminado', 'success');
          }
          this.getExamenesAdmision();
        })
      }
    })
  }

  editCarreraTecnica(examenId: string, fechaExamen: string) {
    const dialogRef = this.dialog.open(FormExamenAdmisionComponent, {
      width: '450px',
      data: {examenId: examenId, fechaExamen: fechaExamen}
    });
  }

  processExamenesAdmisionResponse(data: any) {
    const dataExamenesAdmision: ExamenAdmisionElement[] = [];
    let listExamenesAdmision = data;
    listExamenesAdmision.forEach((element: ExamenAdmisionElement) => {
      dataExamenesAdmision.push(element);
    });
    this.dataSource = new MatTableDataSource<ExamenAdmisionElement>(dataExamenesAdmision);
    this.dataSource.paginator = this.paginator;
  }
}

export interface ExamenAdmisionElement {
  examenId: string,
  fechaExamen: Date
}
