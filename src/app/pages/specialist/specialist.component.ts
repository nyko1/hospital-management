import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-specialist',
    standalone: true,
    templateUrl: './specialist.component.html',
    imports: [
      HeaderComponent,
      RouterLink
    ]
})
export class SpecialistComponent {
  

}
