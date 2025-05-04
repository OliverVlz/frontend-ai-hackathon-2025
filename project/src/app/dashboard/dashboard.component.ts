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
import { MatTabsModule } from '@angular/material/tabs';

import { ZonaCultivoFormComponent } from '../dashboard/zona-cultivo-form/zona-cultivo-form.component';
import { ZonaCultivoListComponent } from '../dashboard/zona-cultivo-list/zona-cultivo-list.component';

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
    MatTabsModule,
    ZonaCultivoFormComponent,
    ZonaCultivoListComponent
  ]
})
export class DashboardComponent {
  cards = [
    { title: 'Card 1', content: 'Content for card 1' },
    { title: 'Card 2', content: 'Content for card 2' },
    { title: 'Card 3', content: 'Content for card 3' },
  ];
}
