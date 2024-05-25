import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCompletedComponent } from './consultation-completed.component';

describe('ConsultationCompletedComponent', () => {
  let component: ConsultationCompletedComponent;
  let fixture: ComponentFixture<ConsultationCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationCompletedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
