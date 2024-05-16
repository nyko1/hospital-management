import { Component } from '@angular/core';
import { HeaderComponent } from "../reception/header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-edit-profil',
    standalone: true,
    templateUrl: './edit-profil.component.html',
    imports: [HeaderComponent, FooterComponent]
})
export class EditProfilComponent {

}
