import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del localStorage si existe
    const token = localStorage.getItem('token');
    
    // Clonar la solicitud original para evitar modificarla directamente
    let modifiedReq = req.clone();

    // Si hay un token, añadirlo al encabezado de autorización
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continuar con la solicitud modificada
    return next.handle(modifiedReq);
  }
}
