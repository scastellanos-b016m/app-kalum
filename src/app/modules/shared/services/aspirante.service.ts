import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Aspirante } from '../../aspirante/model/aspirante.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AspiranteService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addAspirante(aspirante: Aspirante): Observable<any> {
    // const httpHeader = new HttpHeaders({'Authorization': this.authService.token})
    console.log(aspirante);
    return this.http.post(`${BASE_URL}/aspirantes/post`, aspirante);
  }

  getAspiranteByExpediente(noExpediente:string){
    return this.http.get(`${BASE_URL}/aspirantes/${noExpediente}`);
  }

  getAspiranteAlumno(){
    return this.http.get(`${BASE_URL}/aspirantes/GetAspiranteAlumno`);
  }

}
