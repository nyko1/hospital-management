import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpecialistService } from '../services/specialist.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [
        RouterLink
    ]
})
export class HeaderComponent implements OnInit{
    userInfo: any;
    specialist: any;

    constructor(
        private authService: AuthService, 
        private router: Router,
        private specialistService: SpecialistService,
    ) { }

    ngOnInit(): void {
        if (typeof window != 'undefined') {
            this.authService.getUserById(localStorage.getItem('id')!).subscribe(
                response =>{
                    this.userInfo = response
                   // console.log(this.userInfo.USERNAME);
                    this.specialistService.getSpecialistById(localStorage.getItem('id')!).subscribe(
                        response => {
                            this.specialist = response[0]
                            //console.log(this.specialist.PRENOMSPECIALISTE);
                            
                        },
                        error => {
                            console.error('Can\'t get specialist', error )
                        }
                    )
                    
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
