import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-accueil',
    standalone: true,
    templateUrl: './accueil.component.html',
    styleUrl: './accueil.component.css',
    imports: [
        HeaderComponent,
        RouterLink
    ]
})
export class AccueilComponent {

}
