// cronograma-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../../../../environments/environment';
import { Input } from '@angular/core';
interface Cronograma {
  id: number;
  cultivo_nombre: string;
  ubicacion: string;
  fecha_generacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  et_promedio: number;
  precipitacion_promedio: number;
  agua_total: number;
  detalles: Detalle[];
}

interface Detalle {
  id: number;
  dia: number;
  fecha: string;
  hora_inicio: string;
  duracion_horas: number;
  cantidad_agua: number;
  duracion_formateada: string;
}

@Component({
  selector: 'app-cronograma-list',
  standalone: true,
  templateUrl: './cronograma-list.component.html',
  styleUrls: ['./cronograma-list.component.css'],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class CronogramaListComponent implements OnInit {
  @Input() soloReciente = false;
  @Input() mostrarTitulo: boolean = true;

  cronogramas: Cronograma[] = [];
  displayedColumns: string[] = ['dia', 'fecha', 'hora', 'duracion', 'agua'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Cronograma[]>(`${environment.apiUrl}/cronogramas/?ordering=-fecha_generacion`)
      .subscribe({
        next: data => {
          const lista = this.soloReciente ? [data[0]] : data;

          this.cronogramas = lista.map(c => {
            const detallesWithFormat = c.detalles.map(d => ({
              ...d,
              duracion_formateada: this.formatDuration(d.duracion_horas)
            }));
            const fechaFin = detallesWithFormat.length
              ? detallesWithFormat[detallesWithFormat.length - 1].fecha
              : c.fecha_inicio;
            const aguaTotal = detallesWithFormat.reduce((sum, d) => sum + d.cantidad_agua, 0);

            return {
              ...c,
              detalles: detallesWithFormat,
              fecha_fin: fechaFin,
              agua_total: aguaTotal,
              ubicacion: c.ubicacion
            };
          });
        },
        error: err => console.error('Error cargando cronogramas', err)
      });
  }

  private formatDuration(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}min`;
  }
}
