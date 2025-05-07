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
import { FormControl } from '@angular/forms';

import * as L from 'leaflet';
import 'leaflet-draw';

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
  
  // Campos de ubicación
  pais: string = '';
  ciudad: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form without any fields
    this.ubicacionForm = this.fb.group({});
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([4.5709, -74.2973], 6); // Centro en Colombia
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  
    // Añadimos el controlador de geocodificación para búsqueda
    // Nota: usamos una forma más compatible en lugar de L.Control.geocoder()
    const geocoder = L.Control.extend({
      onAdd: function() {
        const div = L.DomUtil.create('div', 'leaflet-control-geocoder');
        div.innerHTML = '<input type="text" placeholder="Buscar ubicación..." />';
        return div;
      }
    });
    
    new geocoder({ position: 'topleft' }).addTo(this.map);
  
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
  
      // Obtener el centro del polígono
      const centro = layer.getBounds().getCenter();
      
      // Realizar geocodificación inversa usando la API de Nominatim (OpenStreetMap)
      this.geocodeReverse(centro.lat, centro.lng);
    });
    
    // Evento para cuando se edita un polígono existente
    this.map.on(L.Draw.Event.EDITED, (event: any) => {
      const layers = event.layers;
      layers.eachLayer((layer: any) => {
        this.drawnCoordinates = layer.toGeoJSON().geometry;
        const centro = layer.getBounds().getCenter();
        this.geocodeReverse(centro.lat, centro.lng);
      });
    });
  }

  // Método para hacer geocodificación inversa usando la API pública de Nominatim
  geocodeReverse(lat: number, lng: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    
    this.http.get(url).subscribe({
      next: (response: any) => {
        if (response && response.address) {
          this.ciudad = response.address.city || 
                       response.address.town || 
                       response.address.village || 
                       response.address.hamlet || 
                       response.address.suburb || 
                       '';
          
          this.pais = response.address.country || '';
          
          this.snackBar.open(`Ubicación detectada: ${this.ciudad}, ${this.pais}`, 'Cerrar', { 
            duration: 3000 
          });
        } else {
          this.snackBar.open('No se pudo detectar la ubicación', 'Cerrar', { 
            duration: 3000 
          });
        }
      },
      error: (error) => {
        console.error('Error en la geocodificación inversa:', error);
        this.snackBar.open('No se pudo obtener la ubicación automáticamente', 'Cerrar', { 
          duration: 3000 
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  onSubmit() {
    if (!this.drawnCoordinates) {
      this.snackBar.open('Por favor, dibuja una zona en el mapa.', 'Cerrar', { duration: 3000 });
      return;
    }

    if (!this.ciudad || !this.pais) {
      this.snackBar.open('No se pudo determinar la ubicación. Por favor, intente de nuevo.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;

    const payload = {
      ciudad: this.ciudad,
      pais: this.pais,
      coordenadas: this.drawnCoordinates
    };

    this.http.post(`${environment.apiUrl}/ubicaciones/`, payload)
      .subscribe({
        next: (ubicacion: any) => {
          this.snackBar.open('Ubicación creada con éxito', 'Cerrar', { duration: 3000 });
          this.ubicacionForm.reset();
          this.ubicacionCreada.emit(ubicacion); // Emitir el objeto completo de ubicación
          this.drawnItems.clearLayers();
          this.drawnCoordinates = null;
          this.ciudad = '';
          this.pais = '';
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