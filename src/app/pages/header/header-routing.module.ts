import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'specialist',
    loadComponent: () => import('../specialist/specialist.component')
      .then(mod => mod.SpecialistComponent)
  },
  {
    path: 'reception',
    loadComponent: () => import('../reception/reception.component')
      .then(mod => mod.ReceptionComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
