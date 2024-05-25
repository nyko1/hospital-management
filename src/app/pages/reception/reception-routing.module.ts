import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionComponent } from './reception.component';

const routes: Routes = [
  {path: '', component: ReceptionComponent},
  {
    path: 'list-patient',
    loadChildren: () => import('../patients/list-patient/list-patient.module')
      .then(mod => mod.ListPatientModule)
  },
  {
    path: 'add-patient',
    loadChildren: () => import('../patients/add-patient/add-patient.module')
      .then(mod => mod.AddPatientModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('../reception/invoice/invoice.module')
      .then(mod => mod.InvoiceModule)
  },
  {
    path: 'appointement',
    loadChildren: () => import('../appointement/appointement.module')
      .then(mod => mod.AppointementModule)
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
export class ReceptionRoutingModule { }
