import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CarreraTecnicaService {

  constructor(private http: HttpClient) { }

  getCarrerasTecnicas(){
    return this.http.get(`${base_url}/carreras-tecnicas`);
  }

  saveCarreraTecnica(body: any) {
    return this.http.post(`${base_url}/carreras-tecnicas/post`, body);
  }
}
