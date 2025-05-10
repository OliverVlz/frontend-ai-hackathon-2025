import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cronograma-display',
  templateUrl: './cronograma-display.component.html',
  styleUrls: ['./cronograma-display.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CronogramaDisplayComponent implements OnInit {
  @Input() cultivo!: any;
  @Output() finalizar = new EventEmitter<void>();

  cronograma: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.cultivo && this.cultivo.id) {
      this.http.post<any>(
        `${environment.apiUrl}/cultivos/${this.cultivo.id}/generar-cronograma/`,
        {},
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
      ).subscribe({
        next: (data) => {
          this.cronograma = data.detalles || [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al obtener/generar el cronograma:', error);
          this.loading = false;
        }
      });
    }
  }

  volver() {
    this.finalizar.emit();
  }
}