import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      console.log('Datos a enviar:', { username, email, password });
      
      this.authService.register({ username, email, password }).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          alert('Usuario registrado con éxito');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error completo:', err);
          let errorMsg = 'Error en el registro';
          
          if (err.error && err.error.error) {
            errorMsg += ': ' + err.error.error;
          } else if (err.error && typeof err.error === 'object') {
            // Formatear errores de validación
            const errorDetails = Object.entries(err.error)
              .map(([field, msgs]) => `${field}: ${msgs}`)
              .join(', ');
            
            if (errorDetails) {
              errorMsg += `: ${errorDetails}`;
            }
          } else if (err.message) {
            errorMsg += ': ' + err.message;
          }
          
          alert(errorMsg);
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores de validación
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
      
      alert('Por favor, complete todos los campos correctamente');
    }
  }
}
