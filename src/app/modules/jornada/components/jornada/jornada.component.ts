import { JornadaService } from './../../../shared/services/jornada.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormJornadaComponent } from './form-jornada.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {
  displayColumns: string[] = ['jornadaId', 'nombreCorto', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<JornadaElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private JornadaService: JornadaService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.getJornadas();
  }

  openFormJornada() {
    const dialogRef = this.dialog.open(FormJornadaComponent, {width: '450px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Jornadas', 'Registro almacenado correctamente', 'success');
        this.getJornadas();
      } else if (result == 2) {
        Swal.fire('Jornadas', 'Error al agregar el registro', 'error');
      }
    })
  }

  getJornadas() {
    this.JornadaService.getJornadas().subscribe(data => {
      console.log(data);
      this.processJornadaResponse(data);
    });
  }

  deleteJornada(jornadaId: any) {
    Swal.fire({
      title: 'Jornadas',
      text: '¿Esta seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.JornadaService.deleteJornada(jornadaId).subscribe((data: any) => {
          if (data.httpStatusCode == 503) {
            Swal.fire('Jornadas', data.mensaje, 'error');
          } else {
            Swal.fire('Jornadas', 'Registro eliminado', 'success');
          }
          this.getJornadas();
        })
      }
    })
  }

  editJornada(jornadaId: string, nombreCorto: string, descripcion: string) {
    const dialogRef = this.dialog.open(FormJornadaComponent, {
      width: '450px',
      data: {jornadaId: jornadaId, nombreCorto: nombreCorto, descripcion: descripcion}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Jornadas', 'Registro almacenado correctamente', 'success');
        this.getJornadas();
      } else if (result == 2) {
        Swal.fire('Jornadas','Ups!!! se genero un error al modificar el registro', 'error');
      }
    });
  }

  processJornadaResponse(data: any) {
    const dataJornada: JornadaElement[] = [];
    let listJornada = data;
    listJornada.forEach((element: JornadaElement) => {
      dataJornada.push(element);
    });
    this.dataSource = new MatTableDataSource<JornadaElement>(dataJornada);
    this.dataSource.paginator = this.paginator;
  }
}

export interface JornadaElement {
  jornadaId: string,
  nombreCorto: string,
  descripcion: string
}
