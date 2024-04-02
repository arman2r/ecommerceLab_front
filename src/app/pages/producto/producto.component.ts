import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { IProducto } from 'src/app/interfaces/IProducto';
import { CurrencyPipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { StoreService } from 'src/app/services/store.service';
import { FavoriteStorageService } from 'src/app/services/favorite-storage.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, MatButtonToggleModule, MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, MatIconModule, CurrencyPipe, JsonPipe, RouterLink],
})
export class ProductoComponent {

  @Input() productData!: IProducto;
  favoritos: any[] = [];
  carrito: any[] = [];
  currentRoute!: string;
  isProductDetail = false;
  quantity = 1


  constructor(private serviceStorage: FavoriteStorageService, private cartService: CartService, private productService: StoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.favoritos = this.serviceStorage.obtenerFavoritos()
    this.carrito = this.cartService.obtenerProductosCarrito()

    this.currentRoute = this.router.url;

    console.log('ruta', this.currentRoute)
    if (this.currentRoute.includes('/producto')) {
      this.isProductDetail = true;
      const productId = this.route.snapshot.paramMap.get('id');
      this.productService.getProduct(Number(productId)).subscribe(producto => {
        console.log('info producto', producto)
        this.productData = producto

        this.route.params.subscribe(params => {
          const cantidad = params['qy'];
          console.log('Second parameter:', cantidad);
          if (cantidad) {
            this.quantity = cantidad
          }

        });
      })
    } else {
      this.isProductDetail = false;
    }
  }

  favoriteProduct(producto: IProducto) {
    const allFavs = this.serviceStorage.obtenerFavoritos()
    const filterFav = allFavs.filter(x => x.id === producto.id)
    if (filterFav.length !== 0) {
      let indice = allFavs.findIndex(produc => produc.id === producto.id);
      this.serviceStorage.eliminarFavorito(indice);
      this.favoritos.splice(indice, 1);
      console.log('favoritos borrados de marca', this.favoritos)
    } else {
      this.serviceStorage.guardarFavorito(producto);
      this.favoritos.push(producto);
      console.log('favoritos marcados', this.favoritos)
    }


    //
  }

  isFavorite(productData: IProducto) {
    return this.favoritos.some(item => item.id === productData.id);
  }

  carritoProduct(producto: IProducto) {
    producto.cantidad = this.quantity
    const allFavs = this.cartService.obtenerProductosCarrito()
    const filterFav = allFavs.filter(x => x.id === producto.id)
    console.log('que hay aqui', filterFav)
    if (filterFav.length !== 0) {
      console.log('comprobar cantidad', filterFav[0].cantidad, this.quantity, Number(filterFav[0].cantidad) === Number(this.quantity))
      if (Number(filterFav[0].cantidad) === Number(this.quantity)) {
        let indice = allFavs.findIndex(produc => produc.id === producto.id);
        this.cartService.eliminarProductoCarrito(indice);
        this.carrito.splice(indice, 1);
        console.log('producto borrados de carrito', this.carrito)
      } else {
        let indice = allFavs.findIndex(produc => produc.id === producto.id);
        this.cartService.actualizarProductoCarrito(indice, producto);
        console.log('producto borrados de carrito', this.carrito)
        const nuevoValor = this.quantity; // Nuevo valor del segundo parámetro
        const rutaActual = this.router.url;
        const partesRuta = rutaActual.split('/'); // Dividir la URL en partes
        partesRuta[partesRuta.length - 1] = nuevoValor.toString(); // Actualizar el segundo parámetro
        const nuevaRuta = partesRuta.join('/'); // Unir las partes de la ruta actualizada
        this.router.navigateByUrl(nuevaRuta);
      }
    } else {
      this.cartService.guardarProductoCarrito(producto);
      this.carrito.push(producto);
      console.log('producto marcados', this.carrito)
    }
  }

  formatDescription(description: string): string {
    return description.replace(/\\n/g, '<br>');
  }

  // Método para incrementar la cantidad
  incrementQuantity(max: number) {
    if (this.quantity <= max - 1) {
      this.quantity++;
    }
  }

  // Método para decrementar la cantidad
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  isCartAdd(productData: IProducto) {
    return this.carrito.some(item => item.id === productData.id);
  }
}
