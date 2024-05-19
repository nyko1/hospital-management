import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";

@Component({
    selector: 'app-add-doctor',
    standalone: true,
    templateUrl: './add-doctor.component.html',
    imports: [
        RouterLink,
        HeaderComponent,
        
    ]
})
export class AddDoctorComponent {

}
