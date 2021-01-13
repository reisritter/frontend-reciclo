import { CategoriaService } from './../service/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaTable } from '../model/CategoriaTable';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-post-categoria',
  templateUrl: './post-categoria.component.html',
  styleUrls: ['./post-categoria.component.css']
})
export class PostCategoriaComponent implements OnInit {

  categoria: CategoriaTable = new CategoriaTable()
  listaCategorias!: CategoriaTable[]
  idCat!:number
  

  constructor(
    private categoriaService : CategoriaService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    let params = this.activatedRoute.snapshot
    if (params && params.params["id"]) {
      this.idCat = params.params["id"]
      this.categoriaService.getByIdCategoria(this.idCat)
        .subscribe(response => this.categoria = response,
          errorResponse => this.categoria = new CategoriaTable())
    }

    this.findAllCategorias()

  }

 

  deleteCategoria(id:number)
  {
    this.categoriaService.deleteCategoria(id).subscribe(() => {      
      alert("Deletado com sucesso!")
      this.findAllCategorias()      
    })
  }

  findAllCategorias(){
    this.categoriaService.getAllCategorias().subscribe((resp: CategoriaTable[]) =>{
      this.listaCategorias = resp    
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.categoria.idCategoria).subscribe((resp: CategoriaTable) =>{
      this.categoria = resp;
    })

  }

  cadastrar(){

    if(this.idCat)
    {
      this.categoriaService.putCategoria(this.idCat).subscribe(resp => {        
        alert('Tema atualizado com sucesso!')
        this.findAllCategorias()
        this.router.navigate(['/post-categoria'])
        window.scroll(0, 0) 

      })
    }
    else
    {
      if (this.categoria.categoriaNome == null) {
        alert('Preencha o campo')
      } else {
        this.categoriaService.postCategoria(this.categoria).subscribe((resp: CategoriaTable) => {
          alert('Tema cadastrado com sucesso!')
          this.findAllCategorias()
          this.router.navigate(['/post-categoria'])
          window.scroll(0, 0) 
        })
      }
    }
    
  }

  }
