import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SignupComponent,
    RouterLink
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent{

  
  


}
