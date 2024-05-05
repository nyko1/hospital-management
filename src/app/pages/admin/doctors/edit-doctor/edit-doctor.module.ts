import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDoctorRoutingModule } from './edit-doctor-routing.module';
import { EditDoctorComponent } from './edit-doctor.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EditDoctorRoutingModule,
    EditDoctorComponent
  ],
  exports:[
    EditDoctorComponent
  ]
})
export class EditDoctorModule { }
