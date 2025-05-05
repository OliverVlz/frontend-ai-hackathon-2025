import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
export class UbicacionFormComponent {
  @Output() ubicacionCreada = new EventEmitter<any>();
  ubicacionForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.ubicacionForm = this.fb.group({
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      // El polígono se agregará en el segundo paso, aquí solo datos básicos
    });
  }

  onSubmit(): void {
    if (this.ubicacionForm.valid) {
      this.isSubmitting = true;
      this.http.post(`${environment.apiUrl}/ubicaciones/`, this.ubicacionForm.value)
        .subscribe({
          next: (ubicacion: any) => {
            this.snackBar.open('Ubicación creada con éxito', 'Cerrar', { duration: 3000 });
            this.ubicacionForm.reset();
            this.ubicacionCreada.emit(ubicacion);
            this.isSubmitting = false;
          },
          error: (error: any) => {
            this.snackBar.open('Error al crear ubicación', 'Cerrar', { duration: 4000 });
            this.isSubmitting = false;
          }
        });
    } else {
      Object.keys(this.ubicacionForm.controls).forEach(key => {
        const control = this.ubicacionForm.get(key);
        control?.markAsTouched();
      });
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.ubicacionForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}
