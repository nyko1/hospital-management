import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientComponent } from './list-patient.component';

const routes: Routes = [
  {path: '', component: ListPatientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPatientRoutingModule { }
