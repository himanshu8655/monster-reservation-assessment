import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInfoForm } from './flight-info-form';

describe('FlightInfoForm', () => {
  let component: FlightInfoForm;
  let fixture: ComponentFixture<FlightInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightInfoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
