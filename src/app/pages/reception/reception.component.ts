import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { SpecialistService } from '../services/specialist.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink
  ],
  providers:[
    
  ],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent implements OnInit{

  specialists: any;
  nombreSpecialiste: Number | undefined
  nombreStaff: number | undefined;
  nombrePatients: Number | undefined;

  constructor(
    private specialistService: SpecialistService,
    private patientService: PatientService
  ){}

  ngOnInit(): void {
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
      this.patientService.getTotalPatientCount().subscribe({
        next:  (response)=>{
        this.nombrePatients = response.total
        },
        error:  (error) =>{
          console.error(error);
          
      }}
    )
    
  }

}
