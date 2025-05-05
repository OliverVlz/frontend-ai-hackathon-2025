import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Crear un nuevo cultivo
  createCultivo(cultivo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cultivos/`, cultivo);
  }

  // Listar todos los cultivos del usuario
  getCultivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cultivos/`);
  }

  // Obtener un cultivo por id
  getCultivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cultivos/${id}/`);
  }

  // Actualizar un cultivo
  updateCultivo(id: number, cultivo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cultivos/${id}/`, cultivo);
  }

  // Eliminar un cultivo
  deleteCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cultivos/${id}/`);
  }

  // Obtener tipos de cultivo (puedes compartir este método con otros servicios si lo prefieres)
  getTiposCultivo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos-cultivo/`);
  }

  // Obtener tipos de riego
  getTiposRiego(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos-riego/`);
  }
}