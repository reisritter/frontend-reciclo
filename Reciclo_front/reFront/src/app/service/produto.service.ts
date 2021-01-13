import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoTable } from '../model/ProdutoTable';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization',localStorage.getItem('token')!)
  }

  getAllProdutos():Observable<ProdutoTable[]>{
    return this.http.get<ProdutoTable[]>('https://reciclo-generation.herokuapp.com/produto/all')
  }

  getByIdProdutos(id : number):Observable<ProdutoTable>{
    return this.http.get<ProdutoTable>(`https://reciclo-generation.herokuapp.com/produto/id/${id}`)
  }

  postProduto(produto: ProdutoTable):Observable<ProdutoTable>{
    return this.http.post<ProdutoTable>('https://reciclo-generation.herokuapp.com/produto',produto)
  }
  putProduto(produto: ProdutoTable):Observable<ProdutoTable>{
    return this.http.put<ProdutoTable>(`https://reciclo-generation.herokuapp.com/produto/${produto.idProduto}`, produto, this.token) 
  }
  deleteProduto(id: number):Observable<ProdutoTable>{
    return this.http.delete<ProdutoTable>(`https://reciclo-generation.herokuapp.com/produto/${id}`)
  }
  getByNomeProduto(produtoNome: string):Observable<ProdutoTable[]>{
    return this.http.get<ProdutoTable[]>(`https://reciclo-generation.herokuapp.com/produto/nome/${produtoNome}`)
  }
}
