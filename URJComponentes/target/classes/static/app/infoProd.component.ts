import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES,RouteParams,Router} from 'angular2/router';
import {Producto, ProductoService}   from './services/producto.service';
import {PedidoService} from './services/pedido.service';
import {NavSupComponent} from './nav-sup.component';
@Component({
    selector: 'infoproducto',
    templateUrl: 'app/infoProducto.html',
    directives: [ROUTER_DIRECTIVES,NavSupComponent]
})

export class InfoProdComponent {
  producto : Producto;
  cantidad=1;
  constructor(routeParams: RouteParams, private service: ProductoService,private servicepd: PedidoService) {
    let id = routeParams.get('id');
        service.getProducto(id).subscribe(
        producto => this.producto = producto,
        error => console.log(error)
    );
}
save(){
  if(this.cantidad>0){
    window.confirm(String(this.cantidad));
    this.servicepd.setaddPedido(this.producto,this.cantidad);
  }

}


}