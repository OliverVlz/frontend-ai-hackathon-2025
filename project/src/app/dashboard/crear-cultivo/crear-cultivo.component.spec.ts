import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCultivoComponent } from './crear-cultivo.component';

describe('CrearCultivoComponent', () => {
  let component: CrearCultivoComponent;
  let fixture: ComponentFixture<CrearCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCultivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
