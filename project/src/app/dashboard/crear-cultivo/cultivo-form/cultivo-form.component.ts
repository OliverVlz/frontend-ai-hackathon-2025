import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cultivo-form',
  standalone: true,
  templateUrl: './cultivo-form.component.html',
  styleUrls: ['./cultivo-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class CultivoFormComponent {
  @Input() ubicacionId: any;
  @Output() cultivoCreado = new EventEmitter<any>();
  cultivoForm: FormGroup;
  isSubmitting = false;

  tiposCultivo: any[] = [];
  tiposRiego: any[] = [];
  etapas = [
    { value: 'plantula', display: 'Plántula' },
    { value: 'crecimiento', display: 'Crecimiento' },
    { value: 'madurez', display: 'Madurez' },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.cultivoForm = this.fb.group({
      nombre: ['', Validators.required],
      etapa_crecimiento: ['', Validators.required],
      tipo_cultivo: ['', Validators.required],
      tipo_riego: ['', Validators.required],
      tasa_flujo: ['', [Validators.required, Validators.min(1)]],
      ubicacion: ['', Validators.required],
    });    
  }

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/tipos-cultivo/`).subscribe({
      next: (data) => { this.tiposCultivo = data; },
      error: (error) => { console.error('Error al obtener tipos de cultivo', error); }
    });

    // Llame a la API para obtener los tipos de riego y formatee los nombres
    this.http.get<any[]>(`${environment.apiUrl}/tipos-riego/`).subscribe({
      next: (data) => { 
        this.tiposRiego = data.map(tipo => ({
          ...tipo,
          nombreCapitalizado: this.capitalizeFirstLetter(tipo.nombre)
        })); 
      },
      error: (error) => { console.error('Error al obtener tipos de riego', error); }
    });

    if (this.ubicacionId) {
      this.cultivoForm.patchValue({
        ubicacion: this.ubicacionId.id // Asegurarse de que se use el ID correcto
      });
    }
  }

  onSubmit(): void {
    if (this.cultivoForm.valid) {
      this.isSubmitting = true;
      const payload = this.cultivoForm.value;

      this.http.post(`${environment.apiUrl}/cultivos/`, payload).subscribe({
        next: (cultivo: any) => {
          this.snackBar.open('Cultivo creado con éxito', 'Cerrar', { duration: 3000 });
          this.cultivoForm.reset();
          this.cultivoCreado.emit(cultivo);
          this.isSubmitting = false;
        },
        error: (error: any) => {
          this.snackBar.open('Error al crear cultivo', 'Cerrar', { duration: 4000 });
          console.error('Detalles del error:', error?.error);
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.cultivoForm.controls).forEach(key => {
        const control = this.cultivoForm.get(key);
        control?.markAsTouched();
      });
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.cultivoForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}