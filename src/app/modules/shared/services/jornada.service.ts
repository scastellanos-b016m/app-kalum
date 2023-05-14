import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor(private http: HttpClient) { }

  getJornadas(){
    return this.http.get(`${base_url}/jornadas`)
  }
}
