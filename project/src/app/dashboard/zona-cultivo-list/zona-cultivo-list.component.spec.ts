import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaCultivoListComponent } from './zona-cultivo-list.component';

describe('ZonaCultivoListComponent', () => {
  let component: ZonaCultivoListComponent;
  let fixture: ComponentFixture<ZonaCultivoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaCultivoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaCultivoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
