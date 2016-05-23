import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {UsuarioService,Usuario} from './services/usuario.service';


@Component({
    selector: 'cabecera-app',
    templateUrl: 'app/header.html',
    directives: [ROUTER_DIRECTIVES]
})


export class HeaderComponent {

  constructor(private router : Router,private service : UsuarioService){}
  estaRegistrado(){
    if(this.service.usuario.TipoUsuario=='Anonimo'){
      this.router.navigate(['Registro']);
    }else{
      this.router.navigate(['Usuarioinfo']);
    }
  }
}
