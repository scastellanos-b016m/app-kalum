import { Injectable } from '@angular/core';
import { Usuario } from '../../usuario/model/usuario.model';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateIdentification } from '../../login/model/update-identification.model';

const BASE_URL_AUTH = environment.base_url_auth;
const BASE_URL_ROLES = environment.base_roles;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;
  private _usuario: Usuario;

  constructor(private http: HttpClient) { }

  public get token(): any {
    if(this._token != null){
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null) {
      this._token = JSON.stringify(sessionStorage.getItem('token') as string);
      return this._token;
    }
    return null;
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') as string) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  login(usuario: Usuario) : Observable<any> {
    const httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(`${BASE_URL_AUTH}/cuentas/Login`, usuario, {headers: httpHeaders}) //bastic
  }

  register(usuario: Usuario): Observable<any>{
    return this.http.post(`${BASE_URL_AUTH}/cuentas/Crear`, usuario);
  }

  associateRecordNumber(updateIdentification: UpdateIdentification){
    console.log(updateIdentification.type);
    console.log("dentro dell associate record number");
    if (updateIdentification.type == 'expediente') {
      return this.http.post(`${BASE_URL_AUTH}/cuentas/finish-register`,updateIdentification);
    }
    else {
      return this.http.post(`${BASE_URL_AUTH}/cuentas/finish-register-alumno`,updateIdentification);
    }

  }

  getToken(token: string): any {
    if (token && token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  saveToken(token: string): void {
    this._token = token;
    sessionStorage.setItem('token', token)
  }

  saveUser(payload: any) : void {
    this._usuario = new Usuario();
    this._usuario.username = payload.username;
    this._usuario.email = payload.email;
    this._usuario.identificationId = payload.identificationId;
    this._usuario.roles = payload[BASE_URL_ROLES];
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
    console.log(this._usuario);
    console.log(payload[BASE_URL_ROLES]);
  }

  logout(): void {
    this._token = '';
    this._usuario == null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  isAuthenticated(): boolean {
    if (this.token != null) {
      let payload = this.getToken(this.token);
      if (payload != null && payload.unique_name && payload.unique_name.length > 0) {
        return true;
      }
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }
}
