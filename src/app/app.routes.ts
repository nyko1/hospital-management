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
    path: '',
    loadChildren: () => import('./pages/admin/admin.module')
        .then(mod => mod.AdminModule)
    },

    { path: '**', component: NotFoundComponent }

];
