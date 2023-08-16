import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { CuentasCobrarService } from 'src/app/modules/shared/services/cuentas-cobrar.service';

@Component({
  selector: 'app-cuentas-cobrar',
  templateUrl: './cuentas-cobrar.component.html',
  styleUrls: ['./cuentas-cobrar.component.css']
})
export class CuentasCobrarComponent implements OnInit {
  displayColumns: string[] = ['correlativo', 'anio', 'descripcion', 'fechaAplica', 'monto', 'mora', 'descuento'];
  dataSource = new MatTableDataSource<CuentasCobrarElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private cuentasCobrarService: CuentasCobrarService, public dialog: MatDialog, public authService: AuthService) {

  }
  ngOnInit(): void {
    this.getResultadoCuentasCobrar();
  }

  getResultadoCuentasCobrar() {
    this.cuentasCobrarService.getCuentasCobrarByCarne(this.authService.usuario.identificationId).subscribe(data => {
      console.log(data);
      this.processCuentasCobrarResponse(data);
    });
  }

  processCuentasCobrarResponse(data: any) {
    const dataCuentasCobrar: CuentasCobrarElement[] = [];
    let listCuentasCobrar = data;
    listCuentasCobrar.forEach((element: CuentasCobrarElement) => {
      dataCuentasCobrar.push(element);
    });
    this.dataSource = new MatTableDataSource<CuentasCobrarElement>(dataCuentasCobrar);
    this.dataSource.paginator = this.paginator;
  }

}

export interface CuentasCobrarElement {
  correlativo: string,
  anio: string,
  descripcion: string,
  fechaAplica: Date,
  monto: number,
  mora: number,
  descuento: number
}
