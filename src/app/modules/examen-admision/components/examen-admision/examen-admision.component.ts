import { ExamenAdmisionService } from './../../../shared/services/examen-admision.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormExamenAdmisionComponent } from './form-examen-admision.component';
import { MatDialog } from '@angular/material/dialog';

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
