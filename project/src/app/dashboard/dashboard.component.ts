import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { CrearCultivoComponent } from '../dashboard/crear-cultivo/crear-cultivo.component';
import { CultivoListComponent } from '../dashboard/mis-cultivos/cultivo-list/cultivo-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    CrearCultivoComponent,
    CultivoListComponent
  ]
})
export class DashboardComponent {
  seccion: 'inicio' | 'crear-cultivo' | 'mis-cultivos' = 'inicio';

  seleccionarSeccion(seccion: 'inicio' | 'crear-cultivo' | 'mis-cultivos') {
    this.seccion = seccion;
  }
}
