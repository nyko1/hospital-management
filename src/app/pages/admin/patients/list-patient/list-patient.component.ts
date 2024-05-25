import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '.././../header/header.component';


import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PatientService } from '../../../services/patient.service';


@Component({
  selector: 'app-list-patient',
  standalone: true,
  providers: [
    MessageService,
    PatientService
  ],
  imports: [
    RouterLink,
    HeaderComponent,
    TableModule, 
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './list-patient.component.html',
})
export class ListPatientComponent  implements OnInit{

  displayModal: boolean = false;
  patients: any;
  idPatient: string | undefined

  constructor(
    private router: Router,
    private messageService: MessageService,
    private patientService: PatientService
    
  ) {}

  ngOnInit() {
    
      this.patientService.getPatients()
      .subscribe((data) => {
        this.patients = data;
        
    });
  }

  editPatient(idPatient: string){
    this.router.navigate(['admin/edit-patient', idPatient])
  }

  confirmDelete(idPatient: string) {
    this.idPatient = idPatient;
    this.displayModal = true;
  }

  onDelete() {
    this.patientService.deletePatient(this.idPatient!).subscribe(() => {
      this.loadSpecialists()
      this.displayModal = false; // Fermer le modal après la suppression
      this.show()

    }, error => {
      console.error('Error deleting patient:', error);
      this.showError
    });
  }


  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete Succefuly' });
  }

  showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Delete' });
  }

  loadSpecialists() {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    });
  }
  
}
