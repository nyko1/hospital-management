import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistComponent } from './specialist.component';

const routes: Routes = [
  {path: '', component: SpecialistComponent},
  {
    path: 'list-patient',
    loadChildren: () => import('../patients/list-patient/list-patient.module')
      .then(mod => mod.ListPatientModule)
  },
  {
    path: 'appointement',
    loadChildren: () => import('../appointement/appointement.module')
      .then(mod => mod.AppointementModule)
  },
  {
    path: 'consultation',
    loadChildren: () => import('../specialist/consultation/consultation.module')
      .then(mod => mod.ConsultationModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
