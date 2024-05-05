import { Component } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-edit-doctor',
    standalone: true,
    templateUrl: './edit-doctor.component.html',
    imports: [
      HeaderComponent,
      RouterLink
    ]
})
export class EditDoctorComponent {

}
