import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;  // URL base del backend Django desde la configuración del entorno

  constructor(private http: HttpClient) {}

  // Registro de usuario
  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/`, data);
  }

  // Login y obtener tokens
  login(data: { username: string; password: string }): Observable<any> {
    // La ruta de token está en el urls.py principal, no en riego/urls.py
    // Por eso necesitamos quitar 'api/' de la ruta y usar '/api/token/' directamente
    return this.http.post(`${environment.apiUrl.replace('/api', '')}/api/token/`, data);
  }

  // Obtener el perfil del usuario
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfil/`);
  }

  // Guardar tokens en localStorage
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // Obtener token de acceso
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.clear();
  }
}
