import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent {

}
