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
    ]
})
export class AppointementDayComponent {

  consultations: Consultation[]=[]
  patients: any[]=[]
  today: string = DateUtil.formatDate(new Date().toISOString());

  constructor(
    private patientService: PatientService,
    private consultationService: ConsultationService
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
  }
}
