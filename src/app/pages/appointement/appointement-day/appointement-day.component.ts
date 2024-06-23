import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ConsultationService } from '../../services/consultation.service';
import { Consultation } from '../../models/consultation.model';
import { DateUtil } from '../../utils/date-util';
import { HeaderComponent } from "../../header/header.component";
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SpecialistService } from '../../services/specialist.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-appointement-day',
    standalone: true,
    templateUrl: './appointement-day.component.html',
    styleUrl: './appointement-day.component.css',
    imports: [
      HeaderComponent,
      TableModule, 
      IconFieldModule,
      InputIconModule,
      FormsModule,
      InputTextModule,
      DialogModule,
      RippleModule,
      TagModule,
      ButtonModule,
      DropdownModule, 
      ToastModule
      
    ],
    providers:[
      MessageService
    ]
})
export class AppointementDayComponent {

  consultations: Consultation[]=[]
  patients: any[]=[]
  today: string = DateUtil.formatDate(new Date().toISOString());
  patientDialog: boolean = false
  submitted: boolean = false
  modalTitle: string | undefined
  specialities: any[] = [];
  consultationType: any
  filteredSpecialists: any[] = [];
  idPatient: string = ""
  specialite: {} | undefined;
  specilists: any;

  constructor(
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private specialistService: SpecialistService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.consultationService.getAppointement().subscribe({
      next: (consultations) => {
        this.consultations = consultations;

        this.patientService.getPatients().subscribe({
          next: (patients) => {
            this.patients = patients;

            // Associer chaque consultation avec les détails complets du patient correspondant
            this.consultations = this.consultations
              .filter(consultation => DateUtil.formatDate(consultation.DATERDV!) === this.today)  // Filtrer les consultations pour aujourd'hui
              .map(consultation => {
                const patient = this.patients.find(p => p.IDDOSSIERPATIENT === consultation.IDDOSSIERPATIENT);
                return {
                  ...consultation,
                  date: DateUtil.formatDate(consultation.DATERDV!),
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

            console.log('List of today\'s consultations with patient details:', this.consultations);
          },
          error: (err) => {
            console.error('Error fetching patients:', err);
          },
          complete: () => {
            console.log('Completed fetching patients.');
          }
        });
      },
      error: (err) => {
        console.error('Error fetching consultations:', err);
      },
      complete: () => {
        console.log('Completed fetching consultations.');
      }
    });

    this.specialistService.getSpecialists().subscribe({
      next: (data) => {
        this.specilists = data;
        this.specialities = data.map((specialist: any) => specialist.SPECIALITE); // Extract specialities
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Specialist data retrieval completed');
      }
    });
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
     this.patientDialog = true;
     this.modalTitle = title
     this.idPatient = id
  }
  hideDialog() {
    this.patientDialog = false;
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
  

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Consultation Succefuly' });
  }

  showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Add Consultation' });
  }

  onAssign(): void {
    if (this.consultations) {
      this.consultations[0].IDDOSSIERPATIENT = this.idPatient;
      this.consultations[0].IDCONSULTATION = this.generateIdConsultation();
      this.consultations[0].DATECONSULTATION = this.formatDateToString(new Date());
      this.consultations[0].TYPECONSULTATION = this.consultationType.toUpperCase()
      //console.log("consultation: ", this.consultations);
      
      this.consultationService.createConsultation(this.consultations[0]).subscribe({
        next: (data) => {
          console.log("Create Successfully");
          //console.log(data);
          
          this.filteredSpecialists = [];
          this.patientDialog = false;
          this.show()
        },
        error: (error) => {
          console.error(error);
          this.showError()
        }
      });
    } else {
      console.log("consultation empty");
    }
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


}
