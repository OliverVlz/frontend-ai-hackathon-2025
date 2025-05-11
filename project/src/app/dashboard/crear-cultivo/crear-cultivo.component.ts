import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionFormComponent } from './ubicacion-form/ubicacion-form.component';
import { CultivoFormComponent } from './cultivo-form/cultivo-form.component';
import { CronogramaDisplayComponent } from './cronograma-display/cronograma-display.component';

@Component({
  selector: 'app-crear-cultivo',
  standalone: true,
  templateUrl: './crear-cultivo.component.html',
  styleUrls: ['./crear-cultivo.component.css'],
  imports: [
    CommonModule,
    UbicacionFormComponent,
    CultivoFormComponent,
    CronogramaDisplayComponent
  ]
})
export class CrearCultivoComponent {
  step = 1;
  ubicacionId: any | null = null;
  cultivoCreadoData: any | null = null;

  onUbicacionCreada(ubicacion: any) {
    this.ubicacionId = ubicacion;
    this.step = 2;
  }

  onCultivoCreado(cultivo: any) {
    this.cultivoCreadoData = cultivo;
    this.step = 3;
  }

  reiniciarFlujo() {
    this.step = 1;
    this.ubicacionId = null;
    this.cultivoCreadoData = null;
  }
}