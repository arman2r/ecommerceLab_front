import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {NgFor, DatePipe, CurrencyPipe, NgIf} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from 'src/app/services/cart.service';
import { IProducto } from 'src/app/interfaces/IProducto';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: true,
  imports: [MatListModule, MatChipsModule, RouterLink, MatTooltipModule, NgFor, NgIf, MatIconModule, MatDividerModule, DatePipe, MatButtonModule, MatCardModule, CurrencyPipe],
})
export class CarritoComponent {
  productos: IProducto[] = []
  totales = 0;
  isAuthenticated = false;

  constructor(private storeProducts: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllProductsCart()

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  getAllProductsCart() {
    this.productos = this.storeProducts.obtenerProductosCarrito()
    this.productos.map((producto: any) => {
      this.totales += (producto.precio * producto.cantidad)
    }) 
  }

}
