import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil.component';

const routes: Routes = [
  {path: '', component: AccueilComponent},
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
    loadChildren: () => import('./invoice/invoice.module')
      .then(mod => mod.InvoiceModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
