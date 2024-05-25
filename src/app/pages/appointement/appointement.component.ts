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


@Component({
  selector: 'app-appointement',
  standalone: true,
  providers: [
    PatientService
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
  patients!: any;

  patientDialog: boolean = false;
  selectedPatients!: string[]

  submitted: boolean = false;

  statuses!: any[];
  modalTitle: string | undefined
  patient: {} | undefined;

  constructor(
    private patientService: PatientService
  ) {}

  ngOnInit() {
    
      this.patientService.getPatients().subscribe(
        data =>{
          this.patients = data
        }
      )
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
