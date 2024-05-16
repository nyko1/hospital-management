import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    ReceptionComponent
  ],
  exports:[
    ReceptionComponent
  ]
})
export class ReceptionModule { }
