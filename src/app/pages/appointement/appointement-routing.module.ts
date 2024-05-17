import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointementComponent } from './appointement.component';

const routes: Routes = [
  {path: '', component: AppointementComponent},
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
export class AppointementRoutingModule { }
