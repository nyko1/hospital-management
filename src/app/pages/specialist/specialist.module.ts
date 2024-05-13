import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { SpecialistComponent } from './specialist.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpecialistRoutingModule,
    SpecialistComponent
  ],
  exports:[
    SpecialistComponent
  ]
})
export class SpecialistModule { }
