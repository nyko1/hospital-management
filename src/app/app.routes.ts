import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
    //{path: '', component: LoginComponent},
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
    { path: '**', component: NotFoundComponent }

];
