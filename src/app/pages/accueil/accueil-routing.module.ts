import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil.component';

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {
    path: 'reception',
    loadChildren: () => import('../reception/reception.module')
      .then(mod => mod.ReceptionModule)
  },
  {
    path: 'specialist',
    loadChildren: () => import('../specialist/specialist.module')
      .then(mod => mod.SpecialistModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('../reception/invoice/invoice.module')
      .then(mod => mod.InvoiceModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
