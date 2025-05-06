import { Component, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-ubicacion-form',
  standalone: true,
  templateUrl: './ubicacion-form.component.html',
  styleUrls: ['./ubicacion-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class UbicacionFormComponent implements AfterViewInit, OnDestroy {
  @Output() ubicacionCreada = new EventEmitter<any>();
  ubicacionForm: FormGroup;
  isSubmitting = false;
  map!: L.Map;
  drawnCoordinates: GeoJSON.Geometry | null = null;
  drawnItems = new L.FeatureGroup();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.ubicacionForm = this.fb.group({
      pais: ['', Validators.required],
      ciudad: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([4.5709, -74.2973], 6); // Centro en Colombia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Geocoder
    (L.Control as any).geocoder().addTo(this.map);

    // Capa de dibujos
    this.map.addLayer(this.drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        marker: false,
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false
      },
      edit: {
        featureGroup: this.drawnItems
      }
    });

    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (event: any) => {
      this.drawnItems.clearLayers();
      const layer = event.layer;
      this.drawnItems.addLayer(layer);
      this.drawnCoordinates = layer.toGeoJSON().geometry;
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  onSubmit(): void {
    if (!this.ubicacionForm.valid) {
      Object.keys(this.ubicacionForm.controls).forEach(key => {
        const control = this.ubicacionForm.get(key);
        control?.markAsTouched();
      });
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    if (!this.drawnCoordinates) {
      this.snackBar.open('Por favor, dibuja una zona en el mapa.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;

    const payload = {
      ...this.ubicacionForm.value,
      coordenadas: this.drawnCoordinates
    };

    this.http.post(`${environment.apiUrl}/ubicaciones/`, payload)
      .subscribe({
        next: (ubicacion: any) => {
          this.snackBar.open('Ubicación creada con éxito', 'Cerrar', { duration: 3000 });
          this.ubicacionForm.reset();
          this.ubicacionCreada.emit(ubicacion);
          this.drawnItems.clearLayers();
          this.drawnCoordinates = null;
          this.isSubmitting = false;
        },
        error: (error: any) => {
          this.snackBar.open('Error al crear ubicación', 'Cerrar', { duration: 4000 });
          console.error(error);
          this.isSubmitting = false;
        }
      });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.ubicacionForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}
