import { JornadaService } from './../../../shared/services/jornada.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormJornadaComponent } from './form-jornada.component';

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
  }

  getJornadas() {
    this.JornadaService.getJornadas().subscribe(data => {
      console.log(data);
      this.processJornadaResponse(data);
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
