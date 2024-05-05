import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin.component';

const routes: Routes = [
  
    {path: '', component: AdminComponent},
      {
        path: 'add-doctor',
        loadChildren: () => import('./add-doctor/add-doctor.module')
          .then(mod => mod.AddDoctorModule)
      },
      {
        path: 'list-doctor',
        loadChildren: () => import('./list-doctor.module')
          .then(mod => mod.ListDoctorModule)
      },
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
