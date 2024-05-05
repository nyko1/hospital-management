import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDoctorComponent } from './list-doctor.component';

const routes: Routes = [
  {path: '', component: ListDoctorComponent, children:[]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDoctorRoutingModule { }
