import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { Location } from '@angular/common';


@Component({
    selector: 'app-edit-patient',
    standalone: true,
    templateUrl: './edit-patient.component.html',
    styleUrl: './edit-patient.component.css',
    imports: [HeaderComponent]
})
export class EditPatientComponent {

  constructor(
    private location: Location
  ){}

  goToBackPage(){
    this.location.back();
  }
}
