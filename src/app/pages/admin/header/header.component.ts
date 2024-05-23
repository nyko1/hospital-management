import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [
        RouterLink,
    ]
})
export class HeaderComponent implements OnInit{
    userInfo: any;
    
    constructor(private authService: AuthService, private router: Router) { }
    ngOnInit(): void {
        if (typeof window != 'undefined') {
            this.authService.getUserById(localStorage.getItem('id')!).subscribe(
                response =>{
                    this.userInfo = response
                    //console.log(this.userInfo.USERNAME);
                    
                },  
                error => {
                    console.error('No id in localstorage', error);
                }
            )
          }
    }
    
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
}
