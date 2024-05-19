import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [
        RouterLink
    ]
})
export class HeaderComponent {
    
    constructor(private authService: AuthService, private router: Router) { }
    
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
}
