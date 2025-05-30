// src/models/ArticuloManufacturado.ts
export interface ArticuloManufacturado {
  id: number;
  denominacion: string;
  descripcion: string;
  precioVenta: number;
  precioCosto: number;
  tiempoEstimando: number;
}
