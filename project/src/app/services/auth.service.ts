import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';  // URL base del backend Django

  constructor(private http: HttpClient) {}

  // Registro de usuario
  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/`, data);
  }

  // Login y obtener tokens
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, data);
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
