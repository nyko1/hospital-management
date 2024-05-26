import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';


import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';


import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { PatientService } from '../../services/patient.service';
import { SpecialistService } from '../../services/specialist.service';
import { ConsultationService } from '../../services/consultation.service';
import { Consultation } from '../../models/consultation.model';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  providers: [
    SpecialistService
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
    ButtonModule,

    
    DialogModule, 
    RippleModule, 
    ToastModule, 
    ToolbarModule, 
    ConfirmDialogModule, 
    InputTextareaModule, 
    FileUploadModule, 
    DropdownModule, 
    TagModule, 
    RadioButtonModule, 
    RatingModule, 
    InputNumberModule
  ],
  templateUrl: './list-patient.component.html',
  styles: [
    `:host ::ng-deep .p-dialog{
        margin: 0 auto 2rem auto;
        display: inline-block; 
        width: auto;;
    }`
]
})
export class ListPatientComponent  implements OnInit{

  consultationDialog: boolean = false;

  submitted: boolean = false;
  consultations?: Consultation
  statuses!: any[];
  modalTitle: string | undefined
  displayModal: boolean = false;
  patients: any;
  idPatient: string = ""
  specialite: {} | undefined;
  specilists: any;
  specialities: any[] = [];
  consultationType: any
  filteredSpecialists: any[] = []; // Array to hold filtered specialists

  constructor(
    private router: Router,
    //private messageService: MessageService,
    private patientService: PatientService,
    private specialistService: SpecialistService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit() {

    this.consultations = {
      IDCONSULTATION: '',
      IDDOSSIERPATIENT: '',
      TYPECONSULTATION: '', // Optional fields
      DATECONSULTATION: '',
      DIAGNOSTIC: '',
      ACTEMEDICAL: '',
      PRESCRIPTION: '',
      CONSTANTE: ''
    };
    
    this.patientService.getPatients()
    .subscribe((data) => {
      this.patients = data;
        
    },
    error =>{
      console.error(error);
      
    }
  );

  this.specialistService.getSpecialists()
    .subscribe((data) => {
      //console.log(data);
      this.specilists = data[0];
      this.specialities = data.map((specialist: any) => specialist.SPECIALITE); // Extract specialities
      //console.log(this.specialities);
      
        
    },
    error =>{
      console.error(error);
      
    }
  );

  }

  generateIdConsultation(): string {
    const now = new Date();
    const datePart = now.toISOString().replace(/[-:.TZ]/g, '').slice(2, 8); // Use 6 characters from date
    const uniquePart = Math.random().toString(36).substring(2, 11).toUpperCase(); // Use 9 characters for uniqueness
    
    // Combine parts and ensure the total length does not exceed 15 characters
    let generatedId = `${datePart}${uniquePart}`;
    if (generatedId.length > 15) {
        generatedId = generatedId.substring(0, 15);
    }
    return generatedId;
  }


  openNew(id:string, title: string) {
    this.specialite = {};
    this.submitted = false;
    this.consultationDialog = true;
    this.modalTitle = title
    this.idPatient = id
  }
  hideDialog() {
    this.consultationDialog = false;
    this.submitted = false;
    this.filteredSpecialists = []
  }

  onSpecialityChange(event: any) {
    const selectedSpecialite = event.value;
    this.specialistService.getSpecialistsBySpeciality(selectedSpecialite).subscribe((data) => {
      this.filteredSpecialists = data.map((specialiste: any) => specialiste.PRENOMSPECIALISTE);
      //console.log(this.filteredSpecialists);
    },
    error => {
      console.error(error);
    });
  }

  
  formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onAssign(): void {
    if (this.consultations) {
      this.consultations.IDDOSSIERPATIENT = this.idPatient;
      this.consultations.IDCONSULTATION = this.generateIdConsultation();
      this.consultations.DATECONSULTATION = this.formatDateToString(new Date());
      this.consultations.TYPECONSULTATION = this.consultationType
      //console.log("consultation: ", this.consultations);
      
      this.consultationService.createConsultation(this.consultations).subscribe(
        (data) => {
          console.log("Create Successfully");
          //console.log(data);
          
          this.filteredSpecialists = [];
          this.consultationDialog = false;
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.log("consultation empty");
    }
  }
  
}
