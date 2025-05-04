import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonaCultivoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener todos los tipos de cultivo
  getTiposCultivo(): Observable<any[]> {
    console.log(`Llamando a: ${this.apiUrl}/tipos-cultivo/`);
    return this.http.get<any[]>(`${this.apiUrl}/tipos-cultivo/`);
  }

  // Obtener todos los tipos de riego
  getTiposRiego(): Observable<any[]> {
    console.log(`Llamando a: ${this.apiUrl}/tipos-riego/`);
    return this.http.get<any[]>(`${this.apiUrl}/tipos-riego/`);
  }

  // Obtener todas las zonas de cultivo del usuario
  getZonasCultivo(): Observable<any[]> {
    console.log(`Obteniendo zonas de cultivo desde: ${this.apiUrl}/zonas-cultivo/`);
    return this.http.get<any[]>(`${this.apiUrl}/zonas-cultivo/`);
  }

  // Obtener una zona de cultivo específica
  getZonaCultivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/zonas-cultivo/${id}/`);
  }

  // Crear una nueva zona de cultivo
  createZonaCultivo(zonaCultivo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/zonas-cultivo/`, zonaCultivo);
  }

  // Actualizar una zona de cultivo existente
  updateZonaCultivo(id: number, zonaCultivo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/zonas-cultivo/${id}/`, zonaCultivo);
  }

  // Eliminar una zona de cultivo
  deleteZonaCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/zonas-cultivo/${id}/`);
  }

  // Generar un cronograma para una zona de cultivo
  generarCronograma(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/zonas-cultivo/${id}/generar-cronograma/`, {});
  }
}
