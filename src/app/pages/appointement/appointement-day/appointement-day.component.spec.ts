import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementDayComponent } from './appointement-day.component';

describe('AppointementDayComponent', () => {
  let component: AppointementDayComponent;
  let fixture: ComponentFixture<AppointementDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointementDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointementDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
