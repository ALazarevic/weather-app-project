import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTemperatureComponent } from './average-temperature.component';

describe('AverageTemperatureComponent', () => {
  let component: AverageTemperatureComponent;
  let fixture: ComponentFixture<AverageTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageTemperatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
