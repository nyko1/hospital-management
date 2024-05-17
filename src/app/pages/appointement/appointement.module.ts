import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointementRoutingModule } from './appointement-routing.module';
import { AppointementComponent } from './appointement.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppointementRoutingModule,
    AppointementComponent
  ],
  exports:[
    AppointementComponent
  ]
})
export class AppointementModule { }
