import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioTable } from '../model/UsuarioTable';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  usuario : UsuarioTable = new UsuarioTable()
  senha!: string
  adm:boolean=false

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  conferirSenha(event:any){
    this.senha= event.target.value
  }
cadastrar(){
  if(this.senha===this.usuario.usuarioSenha){
    if(this.adm)
      this.usuario.usuarioTipo = "ADM"
    else
      this.usuario.usuarioTipo = "USER"    
    this.authService.cadastrar(this.usuario).subscribe((resp: UsuarioTable)=>{
      this.usuario=resp
      this.router.navigate(['/login'])
      alert('Usuário cadastrado com sucesso!')
    })
  }else {
    alert('Suas senhas não conferem')
  }
}}
