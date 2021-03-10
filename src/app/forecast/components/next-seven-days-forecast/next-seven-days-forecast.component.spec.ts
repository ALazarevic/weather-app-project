import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextSevenDaysForecastComponent } from './next-seven-days-forecast.component';

describe('NextSevenDaysForecastComponent', () => {
  let component: NextSevenDaysForecastComponent;
  let fixture: ComponentFixture<NextSevenDaysForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextSevenDaysForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextSevenDaysForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
