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
    styleUrls: ['./consultation-list.component.css'],
    imports: [
      HeaderComponent,
      RouterLink,
      TableModule, 
      CommonModule,
      IconFieldModule,
      InputIconModule,
      InputTextModule,
      ToastModule, 
    ],
    providers: [
      PatientService,
      ConsultationService
    ]
})
export class ConsultationListComponent implements OnInit {
  patients: any[] = [];
  consultations: Consultation[] = [];
  todayConsultations: any[] = [];

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
    const today = new Date().toISOString().split('T')[0];
    this.todayConsultations = this.consultations
      .filter(consultation => consultation.DATECONSULTATION!.startsWith(today))
      .map(consultation => {
        const patient = this.patients.find((patient: { IDDOSSIERPATIENT: string; }) => patient.IDDOSSIERPATIENT === consultation.IDDOSSIERPATIENT);
        return {
          ...consultation,
          patientName: patient ? patient.NOMPATIENT : '',
          patientSurname: patient ? patient.PRENOMSPATIENT : '',
          patientTel: patient ? patient.TELPATIENT : ''
        };
      }).sort((a, b)=>{
        const dateA = new Date(a.DATECONSULTATION!).getTime()
        const dateB = new Date(b.DATECONSULTATION!).getTime()
        return dateA - dateB
      })
    
   // console.log('Today Consultations:', this.todayConsultations);
  }
}
