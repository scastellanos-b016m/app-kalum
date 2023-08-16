import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Alumno } from '../../alumno/model/alumno.model';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addAlumno(alumno: Alumno): Observable<any> {
    console.log(alumno);
    return this.http.post(`${BASE_URL}/alumnos/inscripcion`, alumno);
  }
}
