import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPatientRoutingModule } from './add-patient-routing.module';
import { AddPatientComponent } from './add-patient.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddPatientRoutingModule,
    AddPatientComponent
  ],
  exports:[
    AddPatientComponent
  ]
})
export class AddPatientModule { }
