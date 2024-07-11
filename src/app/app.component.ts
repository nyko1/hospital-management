import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { JwtService } from "./pages/utils/jwt.service";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        RouterOutlet,
        RouterLink,
        
    ],
    providers:[
      JwtService
    ]
})
export class AppComponent implements OnInit, OnDestroy {
  private timeoutId?: number;

  constructor(
    private jwtService: JwtService, 
    private router: Router,
  ) {}

  ngOnInit() {
    this.scheduleTokenCheck();
  }

  ngOnDestroy() {
    // Nettoyage en supprimant le timer lors de la destruction du composant pour éviter les fuites de mémoire
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  scheduleTokenCheck() {
    if (typeof window !== 'undefined') {
      this.timeoutId = window.setTimeout(() => {
        this.checkTokenExpiration();
        this.scheduleTokenCheck(); // Replanifie la vérification
      }, 300000); // Vérifie toutes les 30 minutes
    }
  }

  title = 'hospital-management';

 // Vérifie si le token JWT stocké a expiré
  checkTokenExpiration() {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = this.jwtService.decodeJWT(token);
        
        const currentTime = Date.now() / 1000;
        
        if (decoded && decoded.exp < currentTime) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    }
  }
  
}

