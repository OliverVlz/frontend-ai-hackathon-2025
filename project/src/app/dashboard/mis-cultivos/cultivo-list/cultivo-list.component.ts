import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cultivo-list',
  standalone: true,
  templateUrl: './cultivo-list.component.html',
  styleUrls: ['./cultivo-list.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatExpansionModule, 
    MatGridListModule,
    MatIconModule  
  ]
})
export class CultivoListComponent implements OnInit {
  cultivos: any[] = [];
  userId: number | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe({
      next: (id) => {
        this.userId = id;
        console.log('ID del usuario:', this.userId); // Verifica el ID del usuario
        if (this.userId !== null) {
          this.http.get<any[]>(`${environment.apiUrl}/cultivos/`).subscribe({
            next: (data) => {
              console.log('Datos recibidos de la API:', data);
              if (!Array.isArray(data)) {
                console.error('La respuesta de la API no es un array:', data);
                return;
              }

              const filteredCultivos = data.filter(cultivo => {
                const isMatch = String(cultivo.propietario) === String(this.userId);
                console.log(`Cultivo ${cultivo.nombre}: propietario=${cultivo.propietario}, userId=${this.userId}, match=${isMatch}`);
                return isMatch;
              });

              this.cultivos = filteredCultivos;
              console.log('Cultivos filtrados:', this.cultivos);
            },
            error: (error) => {
              console.error('Error al obtener cultivos', error);
            }
          });
        } else {
          console.error('No se pudo obtener el ID del usuario', Error);
        }
      },
      error: (error) => {
        console.error('No se pudo obtener el ID del usuario', error);
      }
    });
  }
}