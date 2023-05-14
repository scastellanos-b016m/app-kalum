import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';

@Component({
  selector: 'app-carrera-tecnica',
  templateUrl: './carrera-tecnica.component.html',
  styleUrls: ['./carrera-tecnica.component.css']
})
export class CarreraTecnicaComponent implements OnInit {
  displayColumns: string[] = ['carreraId', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<CarreraTecnicaElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private carreraTecnicaService: CarreraTecnicaService){

  }

  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }

  getCarrerasTecnicas(){
    this.carreraTecnicaService.getCarrerasTecnicas().subscribe(data => {
      console.log(data);
      this.processCarreraTecnicaResponse(data);
    });
  }

  processCarreraTecnicaResponse(data: any) {
    const dataCarreraTecnica: CarreraTecnicaElement[] = [];
    let listCarreraTecnica = data;
    listCarreraTecnica.forEach((element: CarreraTecnicaElement) => {
      dataCarreraTecnica.push(element);
    });
    this.dataSource = new MatTableDataSource<CarreraTecnicaElement>(dataCarreraTecnica);
    this.dataSource.paginator = this.paginator;
  }

}

export interface CarreraTecnicaElement {
  carreraId: string,
  nombre: string
}
