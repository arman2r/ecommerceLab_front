import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { Subscription } from 'rxjs';
import { FavoriteStorageService } from 'src/app/services/favorite-storage.service';
import { CartService } from 'src/app/services/cart.service';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
  standalone: true,
  imports: [NgIf, MatBadgeModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
})
export class HeaderToolbarComponent {
  cantidadFavoritos = 0;
  favoritosSubscription!: Subscription;
  cantidadCarrito = 0;
  carritoSubscription!: Subscription;

  isAuthenticated = false;

  constructor(private favoritosService: FavoriteStorageService, private carritoService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.favoritosSubscription = this.favoritosService.favoritos$.subscribe(favoritos => {
      this.cantidadFavoritos = favoritos.length;
    });

    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.cantidadCarrito = carrito.length
    })

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.favoritosSubscription.unsubscribe();
  }
}
