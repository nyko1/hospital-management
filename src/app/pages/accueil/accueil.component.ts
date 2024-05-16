import { Component } from '@angular/core';
import { HeaderComponent } from "../reception/header/header.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-accueil',
    standalone: true,
    templateUrl: './accueil.component.html',
    styleUrl: './accueil.component.css',
    imports: [
        HeaderComponent,
        RouterLink,
        FooterComponent
    ]
})
export class AccueilComponent {

}
