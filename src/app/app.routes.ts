import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin', 
            loadChildren: () => import('../app/pages/admin/admin.module').
            then(m => m.AdminModule), canActivate: [AuthGuard], 
            data: { role: 'admin' } // Rôle requis pour accéder à cette route
    },
    { path: 'reception', 
            loadChildren: () => import('../app/pages/reception/reception.module').
            then(m => m.ReceptionModule), canActivate: [AuthGuard], 
            data: { role: 'reception' } // Rôle requis pour accéder à cette route 
    },
    { path: 'specialist', 
            loadChildren: () => import('../app/pages/specialist/specialist.module').
            then(m => m.SpecialistModule), canActivate: [AuthGuard],
            data: { role: 'specialist' } // Rôle requis pour accéder à cette route
    },
    {
        path: 'accueil',
        loadComponent: () => import('./pages/accueil/accueil.module')
            .then(mod => mod.AccueilModule)
    },
    {
        path: '',
        loadComponent: () => import('./pages/accueil/accueil.component')
            .then(mod => mod.AccueilComponent)
    },


    
    { path: '**', component: NotFoundComponent }

];
