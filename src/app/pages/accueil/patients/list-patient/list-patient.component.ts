import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './list-patient.component.html',
})
export class ListPatientComponent {

}
