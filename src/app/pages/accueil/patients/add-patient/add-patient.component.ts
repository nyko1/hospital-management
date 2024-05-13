import { Component } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-add-patient',
    standalone: true,
    templateUrl: './add-patient.component.html',
    imports: [
      HeaderComponent,
      RouterLink
    ]
})
export class AddPatientComponent {

}
