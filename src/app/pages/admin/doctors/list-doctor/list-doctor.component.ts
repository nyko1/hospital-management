import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../header/header.component";
import { FooterComponent } from "../../../footer/footer.component";

@Component({
    selector: 'app-list-doctor',
    standalone: true,
    templateUrl: './list-doctor.component.html',
    imports: [
        RouterLink,
        HeaderComponent,
        FooterComponent
    ]
})
export class ListDoctorComponent {

}