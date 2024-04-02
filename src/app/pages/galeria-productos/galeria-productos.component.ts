import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ProductoComponent } from '../producto/producto.component';
import { StoreService } from 'src/app/services/store.service';
import { IProducto } from 'src/app/interfaces/IProducto';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-galeria-productos',
  templateUrl: './galeria-productos.component.html',
  styleUrls: ['./galeria-productos.component.scss'],
  standalone: true,
  imports: [ProductoComponent, NgFor],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class GaleriaProductosComponent {

  allProducts: IProducto[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  loading: boolean = false;
  @ViewChild('galeriaProductos', { static: true }) galeriaProductosRef!: ElementRef;


  constructor(public productService: StoreService, private elementRef: ElementRef) { }

  ngOnInit(): void {
   
    this.loadProducts();
  }
 
  onScroll(event: Event): void {
    const sectionElement = this.galeriaProductosRef.nativeElement;
    if (sectionElement) {
      const isAtBottom = sectionElement.scrollTop + sectionElement.clientHeight >= sectionElement.scrollHeight;
      if (isAtBottom && !this.loading) {
        this.loadMoreProducts();
      }
    }
  }

  loadProducts(): void {
    this.galeriaProductosRef.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
    this.loading = true;
    this.productService.getProducts(this.currentPage, this.itemsPerPage)
      .subscribe((res: IProducto[]) => {
        this.allProducts = res;
        this.currentPage++;
        this.loading = false;
      });
  }

  loadMoreProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.currentPage, this.itemsPerPage)
      .subscribe((res: IProducto[]) => {
        this.allProducts.push(...res);
        this.currentPage++;
        this.loading = false;
      });
  }
}
