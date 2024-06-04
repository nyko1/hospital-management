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
    path: 'consultation/:id',
    loadChildren: () => import('../specialist/consultation/consultation.module')
      .then(mod => mod.ConsultationModule)
  },
  {
    path: 'consultation-list',
    loadComponent: () => import('../consultation/consultation-list/consultation-list.component')
      .then(mod => mod.ConsultationListComponent)
  },
  {
    path: 'consultation-pending',
    loadComponent: () => import('../consultation/consultation-pending/consultation-pending.component')
      .then(mod => mod.ConsultationPendingComponent)
  },
  {
    path: 'consultation-completed',
    loadComponent: () => import('../consultation/consultation-completed/consultation-completed.component')
      .then(mod => mod.ConsultationCompletedComponent)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
