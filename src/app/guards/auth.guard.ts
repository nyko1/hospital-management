// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../pages/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

// Cette méthode détermine si la route peut être activée
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const requiredRole = route.data['role']; // Rôle requis pour la route
    const userRole = this.authService.getRole(); // Rôle de l'utilisateur actuel

   if (this.authService.isLoggedIn() && userRole === requiredRole) {
      return true; // Autorise l'accès à la route
    } else {
      this.router.navigate(['/login']); // Redirige vers la page de connexion
      return false; // Refuse l'accès à la route
    }
  }
}
