import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { AccueilComponent } from './accueil.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    AccueilComponent
  ],
  exports:[
    AccueilComponent
  ]
})
export class AccueilModule { }
