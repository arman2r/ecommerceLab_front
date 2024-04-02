import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/galeria-productos/galeria-productos.component').then(
        (mod) => mod.GaleriaProductosComponent
      ),
  },
  {
    path: 'producto/:id',
    loadComponent: () =>
      import('./pages/producto/producto.component').then(
        (mod) => mod.ProductoComponent
      ),
  },
  {
    path: 'producto/:id/:qy',
    loadComponent: () =>
      import('./pages/producto/producto.component').then(
        (mod) => mod.ProductoComponent
      ),
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./pages/carrito/carrito.component').then(
        (mod) => mod.CarritoComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
