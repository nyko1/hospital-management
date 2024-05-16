import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FloatLabelModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}
  
  ngOnInit() {
   
  }

  goToHome(){
    this.router.navigate(['Accueil'])
  }
  


}
