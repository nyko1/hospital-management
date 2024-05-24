import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { SpecialistService } from '../services/specialist.service';
import { PatientService } from '../../../service/patient.service';
import { response } from 'express';

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
      SpecialistService,
      PatientService
    ]
})
export class AdminComponent implements OnInit{
  specialists: any;
  nombreSpecialiste: Number | undefined
  nombreStaff: any;
  nombrePatients: Number | undefined;


  constructor(
    private specialistService: SpecialistService,
    private patientService: PatientService
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

    // Nombre patients
    this.patientService.getTotalPatientCount().subscribe(response=>{
      this.nombrePatients = response.total
    },
    error =>{
      console.error(error);
      
    }
  )


  }




}
