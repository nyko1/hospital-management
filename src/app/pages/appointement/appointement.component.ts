import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { PatientService } from '../services/patient.service';


import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ConsultationService } from '../services/consultation.service';
import { Consultation } from '../models/consultation.model';
import { DateUtil } from '../utils/date-util';


@Component({
  selector: 'app-appointement',
  standalone: true,
  providers: [
    PatientService,
    ConsultationService
  ],
  imports: [
    RouterLink,
    HeaderComponent,
    TableModule, 
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ButtonModule,
    DialogModule, 
    TagModule, 
    TableModule, 
      CommonModule,
      IconFieldModule,
      InputIconModule,
      InputTextModule,
      
  ],
  templateUrl: './appointement.component.html',
})
export class AppointementComponent implements OnInit{
  patients: any[] =[];
  consultations?: Consultation[];

  patientDialog: boolean = false;
  selectedPatients!: string[]

  submitted: boolean = false;

  statuses!: any[];
  modalTitle: string | undefined
  patient: {} | undefined;

  constructor(
    private patientService: PatientService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit() {
    
      this.consultationService.getAppointement().subscribe({
        next: (result) =>{
          this.consultations = result;
          
          this.patientService.getPatients().subscribe({
            next:  (data) =>{
              this.patients = data
               // Associer chaque consultation avec le nom du patient correspondant
              this.consultations = this.consultations?.map(consultation => {
                const patient = this.patients.find(p => p.IDDOSSIERPATIENT === consultation.IDDOSSIERPATIENT);
                const date = DateUtil.formatDate(consultation.DATERDV!)
                return {
                  ...consultation,
                  date,
                    patientDetails: patient ? {
                      firstName: patient.PRENOMSPATIENT,
                      lastName: patient.NOMPATIENT,
                      fullName: `${patient.PRENOMSPATIENT} ${patient.NOMPATIENT}`,
                      age: patient.DATENAISSPATIENT,
                      phone: patient.TELPATIENT,
                      address: patient.ADRESSEPATIENT,
                      job: patient.PROFESSIONPATIENT,
                      sanguinGrp: patient.GROUPESANGUIN,
                    } : null
                };
              });
              //console.log('List of consultations with patient details:', this.consultations);
            }
          })
          console.log('list',this.consultations);
          
          
        },
        error: (err) =>{
          console.log(err);
          
        },
        complete:()=>{
          console.log('Completed');
          
        }
      })    
      
  }

  openNew(title: string) {
    this.patient = {};
    this.submitted = false;
    this.patientDialog = true;
    this.modalTitle = title
  }
  hideDialog() {
    this.patientDialog = false;
    this.submitted = false;
  }
  
}
