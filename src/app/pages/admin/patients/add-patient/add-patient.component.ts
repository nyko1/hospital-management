import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { RouterLink } from '@angular/router';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-add-patient',
    standalone: true,
    templateUrl: './add-patient.component.html',
    imports: [
      HeaderComponent,
      RouterLink,
      ReactiveFormsModule,
      ToastModule
    ],
    providers: [
      MessageService,
      PatientService

    ]
})
export class AddPatientComponent implements OnInit{
  patients: any[] = [];
  patientForm: FormGroup | undefined;
  isEditing = false;
  currentPatientId: string | undefined;
  alertMessage: string | undefined;

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private messageService: MessageService

  ) {
    
  }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      IDDOSSIERPATIENT: [''],
      NOMPATIENT: ['', Validators.required],
      PRENOMSPATIENT: ['', Validators.required],
      DATENAISSPATIENT: ['', Validators.required],
      ADRESSEPATIENT: ['', Validators.required],
      TELPATIENT: ['', Validators.required],
      EMAILPATIENT: [''],
      PROFESSIONPATIENT: ['', Validators.required],
      ANTECEDENTPATIENT: [''],
      GROUPESANGUIN: ['']
    });
    console.log(this.getPatients());
    
  }
  generateIdPatient(): string {
    const now = new Date();
    const datePart = now.toISOString().replace(/[-:.TZ]/g, '').slice(2, 8); // Use 6 characters from date
    let prenomPart = this.patientForm!.get('PRENOMSPATIENT')?.value || '';
    prenomPart = prenomPart.replace(/'/g, '').substring(0, 3).toUpperCase(); // Keep first 3 characters
    const uniquePart = Math.random().toString(36).substring(2, 8).toUpperCase(); // Use 6 characters for uniqueness
  
    // Ensure the total length does not exceed 15 characters
    return `${datePart}${prenomPart}${uniquePart}`.substring(0, 15);
  }
  

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Save Succefuly' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Save' });
}

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  addPatient(): void {
    if (this.patientForm!.valid) {
      let patientFormValue = this.patientForm!.value
      patientFormValue.IDDOSSIERPATIENT = this.generateIdPatient()
      console.log(patientFormValue);
      
      this.patientService.addPatient(patientFormValue).subscribe(
        () => {
          //this.getPatients();
          this.show()
          this.patientForm!.reset();
        },
        (error) => {
          this.showError()
          console.error('There was an error!', error);
        }
      );
    }else{
      this.alertMessage = 'Tous les champs sont obligatoires. Veuillez les remplir avant de soumettre le formulaire.';
      }
  }

  editPatient(patient: any): void {
    this.isEditing = true;
    this.currentPatientId = patient.IDDOSSIERPATIENT;
    this.patientForm!.patchValue(patient);
  }

  

  deletePatient(id: string): void {
    this.patientService.deletePatient(id).subscribe(
      () => {
        this.getPatients();
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

 

  cancelEdit(): void {
    this.isEditing = false;
    this.patientForm!.reset();
  }
}
