import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getProducts(pageNumber: number, pageSize: number): Observable<any> {
    const url = `${environment.apiUrl}/productos`; // Reemplaza 'endpoint' con la ruta de tu API

    // Define los parámetros de paginación
    let params = new HttpParams();
    params = params.append('pagina', pageNumber.toString());
    params = params.append('TamanoPagina', pageSize.toString());

    // Realiza la solicitud GET con los parámetros de paginación
    return this.http.get(url, { params: params });
  }

  getProduct(idProduct: number): Observable<any> {
    const url = `${environment.apiUrl}/productos/${idProduct}`; // Reemplaza 'endpoint' con la ruta de tu API
 
    // Realiza la solicitud GET con los parámetros de paginación
    return this.http.get(url);
  }
}
