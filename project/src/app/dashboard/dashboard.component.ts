import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CronogramaListComponent } from './mis-cronogramas/cronograma-list/cronograma-list.component';
import { CrearCultivoComponent } from '../dashboard/crear-cultivo/crear-cultivo.component';
import { CultivoListComponent } from '../dashboard/mis-cultivos/cultivo-list/cultivo-list.component';
import { ClimaCardsComponent } from '../dashboard/clima-cards/clima-cards.component';
import { MatIconModule } from '@angular/material/icon';
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
    CultivoListComponent,
    CronogramaListComponent,
    ClimaCardsComponent,
    MatIconModule
  ]
})
export class DashboardComponent {
  seccion: 'inicio' | 'crear-cultivo' | 'mis-cultivos' | 'mis-cronogramas' = 'inicio';

  isMobile = window.innerWidth < 768;
  sidenavOpened = false;
  sidebarOpened = false;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  seleccionarSeccion(seccion: typeof this.seccion) {
    this.seccion = seccion;
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  closeOnMobile() {
    if (this.isMobile) {
      this.sidebarOpened = false;
    }
  }
}