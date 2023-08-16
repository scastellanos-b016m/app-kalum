import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { ResultadoExamenAdmisionService } from 'src/app/modules/shared/services/resultado-examen-admision.service';
import { environment } from 'src/environments/environments';

const BASE_EXP = environment.Base_exp;

@Component({
  selector: 'app-resultado-examen-admision-noexpediente',
  templateUrl: './resultado-examen-admision-noexpediente.component.html',
  styleUrls: ['./resultado-examen-admision-noexpediente.component.css']
})
export class ResultadoExamenAdmisionNoexpedienteComponent {
  displayColumns: string[] = ['noExpediente', 'anio', 'descripcion', 'nota'];
  dataSource = new MatTableDataSource<ResultadoExamenAdmisionPorExpedienteElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private resultadoExamenAdmisionService: ResultadoExamenAdmisionService, public dialog: MatDialog, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.getResultadoExamenAdmisionPorExpediente();
  }

  getResultadoExamenAdmisionPorExpediente() {
    // this.resultadoExamenAdmisionService.getResultadoExamenAdmisionPorExpediente(`${BASE_EXP}${this.authService.usuario.identificationId}`).subscribe(data => {
    this.resultadoExamenAdmisionService.getResultadoExamenAdmisionPorExpediente(`${this.authService.usuario.identificationId}`).subscribe(data => {
      console.log(data);
      this.processResultadoExamenAdmisionResponse(data);
    });
  }

  processResultadoExamenAdmisionResponse(data: any) {
    const dataResultadoExamenAdmision: ResultadoExamenAdmisionPorExpedienteElement[] = [];
    let listResultadoExamenAdmision = data;
    listResultadoExamenAdmision.forEach((element: ResultadoExamenAdmisionPorExpedienteElement) => {
      dataResultadoExamenAdmision.push(element);
    });
    this.dataSource = new MatTableDataSource<ResultadoExamenAdmisionPorExpedienteElement>(dataResultadoExamenAdmision);
    this.dataSource.paginator = this.paginator;
  }
}

export interface ResultadoExamenAdmisionPorExpedienteElement {
  noExpediente: string,
  anio: string,
  descripcion: string,
  nota: number
}
