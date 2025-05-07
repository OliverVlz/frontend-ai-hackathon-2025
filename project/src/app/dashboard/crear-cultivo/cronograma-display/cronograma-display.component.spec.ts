import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaDisplayComponent } from './cronograma-display.component';

describe('CronogramaDisplayComponent', () => {
  let component: CronogramaDisplayComponent;
  let fixture: ComponentFixture<CronogramaDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronogramaDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronogramaDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
