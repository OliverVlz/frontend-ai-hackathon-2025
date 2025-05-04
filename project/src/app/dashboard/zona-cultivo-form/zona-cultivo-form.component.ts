import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ZonaCultivoService } from '../../services/zona-cultivo.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-zona-cultivo-form',
  templateUrl: './zona-cultivo-form.component.html',
  styleUrls: ['./zona-cultivo-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ZonaCultivoFormComponent implements OnInit {
  zonaCultivoForm: FormGroup;
  tiposCultivo: any[] = [];
  tiposRiego: any[] = [];
  etapasCrecimiento = [
    { value: 'plantula', viewValue: 'Plántula' },
    { value: 'adulto', viewValue: 'Adulto' },
    { value: 'anciano', viewValue: 'Anciano' }
  ];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private zonaCultivoService: ZonaCultivoService,
    private snackBar: MatSnackBar
  ) {
    this.zonaCultivoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
      coordenadas: ['', [Validators.required]], // En una implementación real, esto vendría del mapa
      area: [null, [Validators.required, Validators.min(0.1)]],
      tipo_cultivo: ['', Validators.required],
      etapa_crecimiento: ['', Validators.required],
      tipo_riego: ['', Validators.required],
      tasa_flujo: [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  ngOnInit(): void {
    this.cargarTiposCultivo();
    this.cargarTiposRiego();
  }

  cargarTiposCultivo(): void {
    console.log('Intentando cargar tipos de cultivo...');
    this.zonaCultivoService.getTiposCultivo().subscribe({
      next: (data: any[]) => {
        console.log('Tipos de cultivo cargados correctamente:', data);
        this.tiposCultivo = data;
      },
      error: (error: any) => {
        console.error('Error al cargar tipos de cultivo:', error);
        this.snackBar.open('Error al cargar tipos de cultivo', 'Cerrar', { duration: 3000 });
        
        // Cargar datos de ejemplo en caso de error
        this.tiposCultivo = [
          { id: 1, nombre: 'Maíz' },
          { id: 2, nombre: 'Tomate' },
          { id: 3, nombre: 'Alfalfa' }
        ];
      }
    });
  }
  
  cargarTiposRiego(): void {
    console.log('Intentando cargar tipos de riego...');
    this.zonaCultivoService.getTiposRiego().subscribe({
      next: (data: any[]) => {
        console.log('Tipos de riego cargados correctamente:', data);
        this.tiposRiego = data;
      },
      error: (error: any) => {
        console.error('Error al cargar tipos de riego:', error);
        this.snackBar.open('Error al cargar tipos de riego', 'Cerrar', { duration: 3000 });
        
        // Cargar datos de ejemplo en caso de error
        this.tiposRiego = [
          { id: 1, nombre: 'goteo', nombre_display: 'Riego por Goteo' },
          { id: 2, nombre: 'aspersion', nombre_display: 'Riego por Aspersión' },
          { id: 3, nombre: 'superficial', nombre_display: 'Riego Superficial' },
          { id: 4, nombre: 'subterraneo', nombre_display: 'Riego Subterráneo' }
        ];
      }
    });
  }

  onSubmit(): void {
    if (this.zonaCultivoForm.valid) {
      this.isSubmitting = true;
      
      this.zonaCultivoService.createZonaCultivo(this.zonaCultivoForm.value)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe(
          (response: any) => {
            console.log('Zona de cultivo creada:', response);
            this.snackBar.open('Zona de cultivo creada con éxito', 'Cerrar', { duration: 3000 });
            this.zonaCultivoForm.reset();
          },
          (error: any) => {
            console.error('Error al crear zona de cultivo:', error);
            let errorMessage = 'Error al crear zona de cultivo';
            
            if (error.error && typeof error.error === 'object') {
              // Formatear errores de validación del backend
              const errorDetails = Object.entries(error.error)
                .map(([field, msgs]) => `${field}: ${msgs}`)
                .join(', ');
              
              if (errorDetails) {
                errorMessage += `: ${errorDetails}`;
              }
            }
            
            this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
          }
        );
    } else {
      // Marcar todos los campos como tocados para mostrar errores de validación
      Object.keys(this.zonaCultivoForm.controls).forEach(key => {
        const control = this.zonaCultivoForm.get(key);
        control?.markAsTouched();
      });
      
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
    }
  }

  // Helper para verificar errores en los campos del formulario
  hasError(controlName: string, errorName: string): boolean {
    const control = this.zonaCultivoForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}
