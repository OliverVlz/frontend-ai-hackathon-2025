import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionFormComponent } from './ubicacion-form/ubicacion-form.component';
import { CultivoFormComponent } from './cultivo-form/cultivo-form.component';

@Component({
  selector: 'app-crear-cultivo',
  standalone: true,
  templateUrl: './crear-cultivo.component.html',
  styleUrls: ['./crear-cultivo.component.css'],
  imports: [CommonModule, UbicacionFormComponent, CultivoFormComponent]
})
export class CrearCultivoComponent {
  step = 1;
  ubicacionId: any | null = null;

  onUbicacionCreada(ubicacion: any) {
    this.ubicacionId = ubicacion; // Asegurar-se de que se reciba el objeto completo de ubicación
    this.step = 2;
  }

  onCultivoCreado(cultivo: any) {
    // Aquí puedes mostrar un mensaje de éxito, reiniciar el flujo, etc.
    this.step = 1;
    this.ubicacionId = null;
  }
}