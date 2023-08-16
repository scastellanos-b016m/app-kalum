import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ResultadoExamenAdmisionService {

  constructor(private http: HttpClient) { }

  getResultadoExamenAdmision() {
    return this.http.get(`${base_url}/resultado-examen-admision`)
  }

  getResultadoExamenAdmisionPorExpediente(id: any) {
    return this.http.get(`${base_url}/resultado-examen-admision/${id}`)
  }

  saveResultadoExamenAdmision(body: any) {
    return this.http.post(`${base_url}/resultado-examen-admision/post`, body)
  }

  deleteResultadoExamenAdmision(id: any, anio: any) {
    const endPoint = `${base_url}/resultado-examen-admision/${id}/${anio}`;
    return this.http.delete(endPoint);
  }

  updateResultadoExamenAdmision(body: any, id: any, anio: any) {
    const endPoint = `${base_url}/resultado-examen-admision/${id}/${anio}`;
    return this.http.put(endPoint, body);
  }

}
