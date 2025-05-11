import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CronogramaListComponent } from './cronograma-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('CronogramaListComponent', () => {
  let component: CronogramaListComponent;
  let fixture: ComponentFixture<CronogramaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Mock para HttpClient
        MatTableModule,         // Módulos de Angular Material utilizados en el componente
        MatCardModule,
        MatIconModule,
        MatTooltipModule,
        CronogramaListComponent // Componente standalone
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CronogramaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});