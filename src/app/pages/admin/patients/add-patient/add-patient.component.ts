import { Component } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";

@Component({
    selector: 'app-add-patient',
    standalone: true,
    templateUrl: './add-patient.component.html',
    imports: [
      HeaderComponent
    ]
})
export class AddPatientComponent {

}
