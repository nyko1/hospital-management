import { Component } from '@angular/core';
import { HeaderComponent } from "../reception/header/header.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-accueil',
    standalone: true,
    templateUrl: './accueil.component.html',
    styleUrl: './accueil.component.css',
    imports: [
        HeaderComponent,
        RouterLink,
        FooterComponent,
        CalendarModule,
        FormsModule
    ]
})
export class AccueilComponent {

}
