import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPatientRoutingModule } from './list-patient-routing.module';
import { ListPatientComponent } from './list-patient.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListPatientRoutingModule,
    ListPatientComponent
  ],
  exports:[
    ListPatientComponent
  ]
})
export class ListPatientModule { }
