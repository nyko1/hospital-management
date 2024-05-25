import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';


import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/productservice';
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
import { PatientService } from '../../../../service/patient.service';
import { SpecialistService } from '../../services/specialist.service';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  providers: [
    ProductService,
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

  statuses!: any[];
  modalTitle: string | undefined
  displayModal: boolean = false;
  patients: any;
  idPatient: string | undefined
  specialite: {} | undefined;
  specilists: any;
  specialities: any[] = [];
  specialist: any[] = [];
  filteredSpecialists: any[] = []; // Array to hold filtered specialists

  constructor(
    private router: Router,
    //private messageService: MessageService,
    private patientService: PatientService,
    private specialistService: SpecialistService
  ) {}

  ngOnInit() {
    
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
      console.log(data);
      this.specilists = data[0];
      this.specialities = data.map((specialist: any) => specialist.SPECIALITE); // Extract specialities
      //console.log(this.specialities);
      
        
    },
    error =>{
      console.error(error);
      
    }
  );

  }

  openNew(title: string) {
    this.specialite = {};
    this.submitted = false;
    this.consultationDialog = true;
    this.modalTitle = title
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
      console.log(this.filteredSpecialists);
    },
    error => {
      console.error(error);
    });
  }


  
}
