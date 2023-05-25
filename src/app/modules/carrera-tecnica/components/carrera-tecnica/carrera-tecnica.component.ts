import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import { FormCarreraTecnicaComponent } from './form-carrera-tecnica.component';
import Swal from 'sweetalert2';

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

  constructor(private carreraTecnicaService: CarreraTecnicaService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }

  openFormCarreraTecnica() {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, {width: '450px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result ==1) {
        Swal.fire('Carreras Técnicas', 'Registro almacenado correctamente', 'success');
        this.getCarrerasTecnicas();
      } else if (result == 2) {
        Swal.fire('Carreras Técnicas', 'Error al agregar el registro', 'error');
      }
    })
  }

  getCarrerasTecnicas(){
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
      data: {carreraId: carreraId, nombre: nombre}
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
