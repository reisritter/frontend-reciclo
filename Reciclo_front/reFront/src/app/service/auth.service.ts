import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginTable } from '../model/UserLoginTable';
import { UsuarioTable } from '../model/UsuarioTable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logar(userLogin: UserLoginTable){    
    return this.http.post<UserLoginTable>('https://reciclo-generation.herokuapp.com/usuario/logar', userLogin)
  }
  cadastrar(user: UsuarioTable): Observable<UsuarioTable> {
    return this.http.post<UsuarioTable>('https://reciclo-generation.herokuapp.com/usuario/cadastrar', user)
  }

  btnSair() {return localStorage.getItem('token') != null}

  btnLogin() {return localStorage.getItem('token') == null}

  btnCadProd() { return localStorage.getItem('token') != null && this.acessoADM()}

  acessoADM():boolean { return localStorage.getItem('acesso') == "ADM"}

}
