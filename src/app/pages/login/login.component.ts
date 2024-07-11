import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FloatLabelModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  username: string | undefined;
  password: string | undefined;
  loading = false;
  errorMessage: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  login(): void {
    this.loading = true;
    this.errorMessage = undefined;
    this.authService.login(this.username!, this.password!).subscribe(
     { 
      next: () => {
        //localStorage.setItem('user', JSON.stringify(response));
        const role = localStorage.getItem('role');
        this.loading = false;
        
        switch (role) {
          case 'admin':
            this.router.navigate(['admin']).catch(err => console.error('Navigation error:', err));
            console.log("Connexion OK");
            break;
          case 'reception':
          case 'receptionniste':
            this.router.navigate(['/reception']).catch(err => console.error('Navigation error:', err));
            break;
          default:
            this.router.navigate(['/specialist']).catch(err => console.error('Navigation error:', err));
            break;
        }
        
      },
       error: (error) => {
        this.loading = false;
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        console.error('Login failed', error);
      }
    });
  }
}
