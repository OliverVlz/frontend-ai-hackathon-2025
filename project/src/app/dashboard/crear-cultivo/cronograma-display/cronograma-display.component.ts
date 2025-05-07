import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cronograma-display',
  templateUrl: './cronograma-display.component.html',
  styleUrls: ['./cronograma-display.component.css'],
  standalone: true,
  imports: [CommonModule] // ✅ Mover aquí correctamente
})
export class CronogramaDisplayComponent implements OnInit {
  @Input() cultivo!: any;
  @Output() finalizar = new EventEmitter<void>();

  cronograma: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/cultivos/${this.cultivo}/cronograma/`).subscribe({
      next: (data) => {
        this.cronograma = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener el cronograma:', error);
        this.loading = false;
      }
    });
  }

  volver() {
    this.finalizar.emit();
  }
}