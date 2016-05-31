import {Component}  from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Producto,ProductoService}   from './services/producto.service';
import {Comentario} from './services/comentario.service';

@Component({
    template: `
              <div id="products">
                  <h3>Productos</h3>
                  <ul class="nav nav-tabs">
                      <li class="active"><a data-toggle="tab" href="#existingProducts">Productos existentes</a></li>
                      <li><a [routerLink]="['AdmNuevoProducto']" data-toggle="tab">Añadir producto</a></li>
                  </ul>

                  <div class="tab-content">
                      <div id="existingProducts" class="tab-pane fade in active">
                          <br>
                          <div class="panel-group">
                                <div class="panel panel-default">
                                      <div class="panel-body">
                                          <h3>{{producto.Nombre}}</h3>
                                          <p>{{producto.DescripcionC}}</p>
                                          <p>Precio: {{producto.Precio}}</p>
                                          <p>{{producto.DescripcionL}}</p>
                                          <p>Cantidad: {{producto.Stock}}</p>
                                          <button (click)="editProducto()" class="btn btn-default" type="button" id="botonAdmin"><i class="fa fa-pencil fa-fw"></i> Modificar articulo</button>
                                          <button (click)="removeProducto()" class="btn btn-default" type="button" id="botonAdmin"><i class="fa fa-trash fa-fw"></i> Eliminar articulo</button>
                                          <button (click)="gotoProductos()" class="btn btn-default" type="button" id="botonAdmin"> Todos los articulos</button>
                                          <hr>

                                          <div *ngFor="#comentario of comentarios">
                                            <p>Usuario: {{comentario.NombreUsuario}}</p>
                                            <p>ID: {{comentario.Id}}</p>
                                            <p>Opinion: {{comentario.Opinion}}</p>
                                            <p>Vloracion Positiva: {{comentario.ValoracionPos}}</p>
                                            <p>Valoracion Negativa: {{comentario.ValoracionNeg}}</p>
                                            <p>Recomendacion: {{comentario.Recomendacion}}</p>
                                            <button (click)="removeComentario(comentario.Id)" class="btn btn-default" type="button" id="botonAdmin"><i class="fa fa-trash fa-fw"></i> Eliminar comentario</button>
                                            <br>
                                          </div>
                                      </div>
                              </div>
                          </div>
                      </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class AdmProductoDetalleComponent {

    producto: Producto;
    comentarios: Array<Comentario>;

    constructor(private router: Router, routeParams: RouteParams, private service: ProductoService) {
        let id = routeParams.get('id');
        service.getProducto(id).subscribe(
            producto => this.producto = producto,
            error => console.error(error)
        );
        this.cargarComentarios();

        this.comentarios=this.service.getComentarios(this.producto.Id);

    }

    removeProducto() {
        let okResponse = window.confirm("¿Quieres borrar este producto?");
        if (okResponse) {
            this.service.removeProducto(this.producto).subscribe(
                _ => this.router.navigate(['AdmProductos']),
                error => console.error(error)
            )
        }
    }

    editProducto() {
        this.router.navigate(['AdmEditarProducto', { id: this.producto.Id }]);
    }

    gotoProductos() {
        this.router.navigate(['AdmProductos']);
    }

    removeComentario(id: number) {
      let okResponse = window.confirm("¿Quieres borrar este comentario?");
      if (okResponse) {
          this.service.removeComentario(this.producto, id).subscribe(
              _ => this.router.navigate(['AdmProductoDetalle', {id: this.producto.Id}]),
              error => console.error(error)
          )
      }
    }

    cargarComentarios(){
      this.comentarios=this.service.getComentarios(this.producto.Id);

    }
}
