import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { ToastModule } from 'primeng/toast';

import { PatientService } from '../../services/patient.service';
import { RouterLink } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { Consultation } from '../../models/consultation.model';

@Component({
    selector: 'app-consultation-list',
    standalone: true,
    templateUrl: './consultation-list.component.html',
    styleUrl: './consultation-list.component.css',
    imports: [
      HeaderComponent,
      RouterLink,
      HeaderComponent,
      TableModule, 
      CommonModule,
      IconFieldModule,
      InputIconModule,
      InputTextModule,
      ToastModule, 
      
    ],
    providers:[
      PatientService,
      ConsultationService
    ]
})
export class ConsultationListComponent implements OnInit{
  patients: any
  consultations: Consultation[] | undefined


  constructor(
    private patientService: PatientService,
    private consultationService: ConsultationService
  ){}

  ngOnInit(): void {
    
    this.patientService.getPatients().subscribe(
      data =>{
        this.patients = data
      }
    )
    this.consultationService.getConsultations().subscribe(
      data =>{
        this.consultations = data
        
        //this.patientService.getPatient()
        console.log(this.consultations);
        
      }
    )
  }





}
