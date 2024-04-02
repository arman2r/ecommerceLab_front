export interface IProducto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    cantidad?: number;
    urlImagen: string;
}