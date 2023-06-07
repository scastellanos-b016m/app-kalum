import { Injectable } from '@angular/core';
import { Usuario } from '../../usuario/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;
  private _usuario: Usuario;

  constructor() { }
}
