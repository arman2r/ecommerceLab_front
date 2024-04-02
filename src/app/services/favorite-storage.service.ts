import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteStorageService {

  private favoritosSubject = new BehaviorSubject<any[]>([]);
  favoritos$ = this.favoritosSubject.asObservable();
  private STORAGE_KEY = 'favoritos';

  constructor() {
    this.notificarCambios();
  }

  // Guardar un elemento como favorito
  guardarFavorito(producto: any) {
    const favoritos = this.obtenerFavoritos();
    favoritos.push(producto);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
    this.notificarCambios();
  }

  // Obtener todos los elementos favoritos
  obtenerFavoritos(): any[] {
    const favoritosString = localStorage.getItem(this.STORAGE_KEY);
    if (favoritosString) {
      return JSON.parse(favoritosString);
    }
    return [];
  }

  // Actualizar un elemento favorito
  actualizarFavorito(index: number, producto: any) {
    const favoritos = this.obtenerFavoritos();
    if (index >= 0 && index < favoritos.length) {
      favoritos[index] = producto;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
      this.notificarCambios();
      return true;
    }
    return false;
  }

  // Eliminar un elemento favorito
  eliminarFavorito(index: number) {
    const favoritos = this.obtenerFavoritos();
    if (index >= 0 && index < favoritos.length) {
      favoritos.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
      this.notificarCambios();
      return true;
    }
    return false;
  }

  // Limpiar todos los elementos favoritos
  limpiarFavoritos() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.notificarCambios();
  }

  // Notificar cambios a los componentes suscritos
  private notificarCambios() {
    const favoritos = this.obtenerFavoritos();
    this.favoritosSubject.next(favoritos);
  }
}
