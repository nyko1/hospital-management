import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { SpecialistService } from '../services/specialist.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [
        HeaderComponent,
        RouterLink,
        FooterComponent,
        
    ],
    providers:[
      SpecialistService
    ]
})
export class AdminComponent implements OnInit{
  specialists: any;
  nombreSpecialiste: Number | undefined
  nombreStaff: any;


  constructor(
    private specialistService: SpecialistService,
  ){}
  ngOnInit() {
    //Nombre de specialiste par specialite
    this.specialistService.getDoctorCount()
    .subscribe(
        response =>{
          this.nombreSpecialiste = response[0].nombre
        }
    )

    //Nombre de staff 
    this.specialistService.getStaffCount()
    .subscribe(
        response =>{
          this.nombreStaff = response[0].staff
        }
    )



  }




}
