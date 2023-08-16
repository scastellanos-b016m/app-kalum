import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AspiranteService } from '../../shared/services/aspirante.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';
import { DatePipe } from '@angular/common';
import { FormresultadoExamenAdmisionComponent } from '../../resultado-examen-admision/components/resultado-examen-admision/formresultado-examen-admision.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aspirante',
  templateUrl: './aspirante.component.html',
  styleUrls: ['./aspirante.component.css']
})
export class AspiranteComponent implements OnInit{

  displayColumns: string[] = ['number', 'noExpediente', 'nombreCompleto', 'direccion', 'telefono', 'email', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<AspiranteElement>();
  pipe = new DatePipe('en-US');

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private aspiranteService: AspiranteService, public dialog: MatDialog,
    public authService: AuthService, private router : Router) {

  }

  ngOnInit(): void {
    console.log('iniciando onInit');
    this.getAspirantes();
  }

  getAspirantes() {
    this.aspiranteService.getAspiranteAlumno().subscribe(data => {
      console.log(data);
      this.processAspiranteResponse(data);
    })
  }

  processAspiranteResponse(data: any) {
    const dataAspirante: AspiranteElement[] = [];
    let listAspirante = data;
    let number = 1;
    listAspirante.forEach((element: AspiranteElement) => {
      element.number = number;
      dataAspirante.push(element);
      number++;
    });
    this.dataSource = new MatTableDataSource<AspiranteElement>(dataAspirante);
    this.dataSource.paginator = this.paginator;
  }

  openFormResultadoExamenAdmision(noExpediente: string) {
    const anio = new Date().getFullYear();
    const aspiranteResultado = true;
    const dialogRef = this.dialog.open(FormresultadoExamenAdmisionComponent, {
      width: '450px',
      data: {noExpediente: noExpediente, anio: anio, aspiranteResultado: aspiranteResultado}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Resultado Examen Admisión', 'Registro almacenado correctamente', 'success');
        this.router.navigate(['/dashboard/resultadoExamenAdmision']);
      } else if (result == 2) {
        Swal.fire('Resultado Examen Admisión', 'Error al agregar el registro', 'error');
      }
    })
  }

}

export interface AspiranteElement {
  number: number,
  noExpediente: string,
  nombreCompleto: string,
  direccion: string,
  telefono: string,
  email: string,
  estatus: string
}
