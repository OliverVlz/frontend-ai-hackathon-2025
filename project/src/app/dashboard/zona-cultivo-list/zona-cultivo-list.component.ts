import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZonaCultivoService } from '../../services/zona-cultivo.service';

@Component({
  selector: 'app-zona-cultivo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './zona-cultivo-list.component.html',
  styleUrls: ['./zona-cultivo-list.component.css']
})
export class ZonaCultivoListComponent implements OnInit {
  zonasCultivo: any[] = [];
  isLoading = false;
  displayedColumns: string[] = ['nombre', 'tipoCultivo', 'etapaCrecimiento', 'tipoRiego', 'area', 'acciones'];
  
  constructor(
    private zonaCultivoService: ZonaCultivoService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.cargarZonasCultivo();
  }
  
  cargarZonasCultivo(): void {
    this.isLoading = true;
    console.log('Cargando zonas de cultivo...');
    
    this.zonaCultivoService.getZonasCultivo().subscribe({
      next: (zonas) => {
        console.log('Zonas de cultivo cargadas:', zonas);
        
        // Log detallado para depuración
        if (zonas && zonas.length > 0) {
          console.log('Detalle de la primera zona:');
          console.log('- ID:', zonas[0].id);
          console.log('- Nombre:', zonas[0].nombre);
          console.log('- Tipo de cultivo ID:', zonas[0].tipo_cultivo);
          console.log('- Tipo de cultivo nombre:', zonas[0].tipo_cultivo_nombre);
          console.log('- Tipo de riego ID:', zonas[0].tipo_riego);
          console.log('- Tipo de riego nombre:', zonas[0].tipo_riego_nombre);
        }
        
        this.zonasCultivo = zonas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar zonas de cultivo:', error);
        this.snackBar.open('Error al cargar zonas de cultivo', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
        
        // Datos de ejemplo en caso de error
        this.zonasCultivo = [
          {
            id: 1,
            nombre: 'Campo Norte',
            tipo_cultivo: 1,
            tipo_cultivo_nombre: 'Maíz',
            etapa_crecimiento: 'adulto',
            tipo_riego: 1,
            tipo_riego_nombre: 'Riego por Goteo',
            area: 5000,
            tasa_flujo: 500,
            fecha_creacion: '2025-05-01'
          },
          {
            id: 2,
            nombre: 'Campo Sur',
            tipo_cultivo: 2,
            tipo_cultivo_nombre: 'Tomate',
            etapa_crecimiento: 'plantula',
            tipo_riego: 2,
            tipo_riego_nombre: 'Riego por Aspersión',
            area: 3000,
            tasa_flujo: 300,
            fecha_creacion: '2025-05-02'
          }
        ];
      }
    });
  }
  
  verDetalle(id: number): void {
    console.log(`Ver detalle de zona ${id}`);
    // Implementar navegación al detalle de la zona
  }
  
  generarCronograma(id: number): void {
    console.log(`Generar cronograma para zona ${id}`);
    // Implementar generación de cronograma
  }
  
  eliminarZona(id: number): void {
    console.log(`Eliminar zona ${id}`);
    // Implementar eliminación de zona
  }
}
