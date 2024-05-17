import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
    //{path: '', component: LoginComponent},
    {
        path: '',
        loadChildren: () => import('./pages/accueil/accueil.module')
            .then(mod => mod.AccueilModule)
        },
    {
        path: 'reception',
        loadChildren: () => import('./pages/reception/reception.module')
          .then(mod => mod.ReceptionModule)
      },
      
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module')
          .then(mod => mod.LoginModule)
      },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module')
            .then(mod => mod.AdminModule)
    },
    {
        path: 'accueil',
        loadChildren: () => import('./pages/accueil/accueil.module')
            .then(mod => mod.AccueilModule)
        },
    {
        path: 'specialist',
        loadChildren: () => import('./pages/specialist/specialist.module')
            .then(mod => mod.SpecialistModule)
        },
    {
        path: 'edit-password',
        loadChildren: () => import('./pages/edit-profil/edit-profil.module')
            .then(mod => mod.EditProfilModule)
        },
        {
            path: 'appointement',
            loadChildren: () => import('./pages/appointement/appointement.module')
                .then(mod => mod.AppointementModule)
            },
    { path: '**', component: NotFoundComponent }

];
