import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PatientService } from '../../services/patient.service';
import { ConsultationService } from '../../services/consultation.service';
import { Consultation } from '../../models/consultation.model';

@Component({
    selector: 'app-consultation-completed',
    standalone: true,
    templateUrl: './consultation-completed.component.html',
    styleUrl: './consultation-completed.component.css',
    imports: [
      HeaderComponent,
      TableModule,
      CommonModule,
      IconFieldModule,
      InputIconModule,
      InputTextModule,
      
    ],
    providers: [
      PatientService,
      ConsultationService
    ]
})
export class ConsultationCompletedComponent implements OnInit {
  patients: any[] = [];
  consultations: Consultation[] = [];
  ConsultationsList: any[] = [];

  constructor(
    private patientService: PatientService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(
      data => {
        this.patients = data;
        //console.log('Patients:', this.patients);
        this.consultationService.getConsultations().subscribe(
          data => {
            this.consultations = data;
            //console.log('Consultations:', this.consultations);
            this.filterTodayConsultations();
          }
        );
      }
    );
  }

  filterTodayConsultations(): void {
    this.ConsultationsList = this.consultations
    .filter(consultation => consultation.STATUT === 'OK')
      .map(consultation => {
        const patient = this.patients.find((patient: { IDDOSSIERPATIENT: string; }) => patient.IDDOSSIERPATIENT === consultation.IDDOSSIERPATIENT);
        return {
          ...consultation,
          patientName: patient ? patient.NOMPATIENT : '',
          patientSurname: patient ? patient.PRENOMSPATIENT : '',
          patientTel: patient ? patient.TELPATIENT : ''
        };
      }).sort((a, b) => {
        const dateA = new Date(a.DATECONSULTATION!).getTime(); 
        const dateB = new Date(b.DATECONSULTATION!).getTime(); 
        return dateB - dateA; // Trie en ordre décroissant
      });
    
   // console.log('Today Consultations:', this.todayConsultations);
  }


}
