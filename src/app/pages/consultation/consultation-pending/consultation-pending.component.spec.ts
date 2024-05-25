import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationPendingComponent } from './consultation-pending.component';

describe('ConsultationPendingComponent', () => {
  let component: ConsultationPendingComponent;
  let fixture: ComponentFixture<ConsultationPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
