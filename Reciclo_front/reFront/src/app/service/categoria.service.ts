import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaTable } from '../model/CategoriaTable';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization',localStorage.getItem('token')!)
  }

  getAllCategorias():Observable<CategoriaTable[]>{
    return this.http.get<CategoriaTable[]>('https://reciclo-generation.herokuapp.com/categoria')
  }

  getByIdCategoria(id : number):Observable<CategoriaTable>{
    return this.http.get<CategoriaTable>(`https://reciclo-generation.herokuapp.com/categoria/id/${id}`)
  }

  postCategoria(categoria: CategoriaTable):Observable<CategoriaTable>{
    return this.http.post<CategoriaTable>('https://reciclo-generation.herokuapp.com/categoria',categoria)
  }
  putCategoria(id : number):Observable<CategoriaTable>{
    return this.http.put<CategoriaTable>(`https://reciclo-generation.herokuapp.com/categoria/${id}` , this.token)
  }
  deleteCategoria(id : number){
    return this.http.delete(`https://reciclo-generation.herokuapp.com/categoria/${id}`)
  }
  getByNomeCategoria(categoriaNome : string):Observable<CategoriaTable[]>{
    return this.http.get<CategoriaTable[]>(`https://reciclo-generation.herokuapp.com/categoria/${categoriaNome}`, this.token)
  }
}
