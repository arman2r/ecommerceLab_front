import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private carritoSubject = new BehaviorSubject<any[]>([]);
  carrito$ = this.carritoSubject.asObservable();
  private STORAGE_KEY = 'carrito';

  constructor() {
    this.notificarCambiosCarrito();
  }

  // Guardar un elemento en el carrito
  guardarProductoCarrito(producto: any) {
    const favoritos = this.obtenerProductosCarrito();
    favoritos.push(producto);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
    this.notificarCambiosCarrito();
  }

  // Obtener todos los elementos del carrito
  obtenerProductosCarrito(): any[] {
    const favoritosString = localStorage.getItem(this.STORAGE_KEY);
    if (favoritosString) {
      return JSON.parse(favoritosString);
    }
    return [];
  }

  // Actualizar un producto del carrito
  actualizarProductoCarrito(index: number, producto: any) {
    const favoritos = this.obtenerProductosCarrito();
    if (index >= 0 && index < favoritos.length) {
      favoritos[index] = producto;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
      this.notificarCambiosCarrito();
      return true;
    }
    return false;
  }

  // Eliminar un producto del carrito
  eliminarProductoCarrito(index: number) {
    const favoritos = this.obtenerProductosCarrito();
    if (index >= 0 && index < favoritos.length) {
      favoritos.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
      this.notificarCambiosCarrito();
      return true;
    }
    return false;
  }

  // Limpiar todos los elementos del carrito
  limpiarCarrito() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.notificarCambiosCarrito();
  }

  // Notificar cambios a los componentes suscritos
  private notificarCambiosCarrito() {
    const favoritos = this.obtenerProductosCarrito();
    this.carritoSubject.next(favoritos);
  }
}
