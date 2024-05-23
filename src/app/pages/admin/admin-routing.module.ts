import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  
    {path: '', component: AdminComponent},
      {
        path: 'add-doctor',
        loadChildren: () => import('./doctors/add-doctor/add-doctor.module')
          .then(mod => mod.AddDoctorModule)
      },
      {
        path: 'list-doctor',
        loadChildren: () => import('./doctors/list-doctor/list-doctor.module')
          .then(mod => mod.ListDoctorModule)
      },
      {
        path: 'list-patient',
        loadChildren: () => import('./patients/list-patient/list-patient.module')
          .then(mod => mod.ListPatientModule)
      },
      {
        path: 'edit-doctor/:id',
        loadChildren: () => import('./doctors/edit-doctor/edit-doctor.module')
          .then(mod => mod.EditDoctorModule)
      },


    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
