import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CultivoService } from '../../../services/cultivo.service';
import { finalize } from 'rxjs/operators';

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
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class CultivoFormComponent implements OnInit, OnChanges {
  @Input() ubicacionId!: number | null;
  @Output() cultivoCreado = new EventEmitter<any>();

  cultivoForm: FormGroup;
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
    private cultivoService: CultivoService,
    private snackBar: MatSnackBar
  ) {
    this.cultivoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
      tipo_cultivo: ['', Validators.required],
      etapa_crecimiento: ['', Validators.required],
      tipo_riego: ['', Validators.required],
      tasa_flujo: [null, [Validators.required, Validators.min(0.1)]],
      ubicacion: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTiposCultivo();
    this.cargarTiposRiego();
    if (this.ubicacionId !== null) {
      this.cultivoForm.patchValue({ ubicacion: this.ubicacionId });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ubicacionId'] && this.ubicacionId !== null) {
      this.cultivoForm.patchValue({ ubicacion: this.ubicacionId });
    }
  }

  cargarTiposCultivo(): void {
    this.cultivoService.getTiposCultivo().subscribe({
      next: (data: any[]) => this.tiposCultivo = data,
      error: () => this.snackBar.open('Error al cargar tipos de cultivo', 'Cerrar', { duration: 3000 })
    });
  }

  cargarTiposRiego(): void {
    this.cultivoService.getTiposRiego().subscribe({
      next: (data: any[]) => this.tiposRiego = data,
      error: () => this.snackBar.open('Error al cargar tipos de riego', 'Cerrar', { duration: 3000 })
    });
  }

  onSubmit(): void {
    if (this.cultivoForm.valid) {
      this.isSubmitting = true;
      this.cultivoService.createCultivo(this.cultivoForm.value)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe(
          (response: any) => {
            this.snackBar.open('Cultivo creado con éxito', 'Cerrar', { duration: 3000 });
            this.cultivoForm.reset();
            this.cultivoCreado.emit(response);
          },
          (error: any) => {
            let errorMessage = 'Error al crear cultivo';
            if (error.error && typeof error.error === 'object') {
              const errorDetails = Object.entries(error.error)
                .map(([field, msgs]) => `${field}: ${msgs}`)
                .join(', ');
              if (errorDetails) errorMessage += `: ${errorDetails}`;
            }
            this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
          }
        );
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
}