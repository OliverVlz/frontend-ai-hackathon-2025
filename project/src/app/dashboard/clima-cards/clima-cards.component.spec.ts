import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaCardsComponent } from './clima-cards.component';

describe('ClimaCardsComponent', () => {
  let component: ClimaCardsComponent;
  let fixture: ComponentFixture<ClimaCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimaCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimaCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
