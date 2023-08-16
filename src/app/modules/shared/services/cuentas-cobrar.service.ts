import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CuentasCobrarService {

  constructor(private http: HttpClient) { }

  getCuentasCobrarByCarne(carne:string){
    return this.http.get(`${BASE_URL}/cuentas-cobrar/${carne}`);
  }

}
