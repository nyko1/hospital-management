import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { ConsultationService } from '../../services/consultation.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DateUtil, dateNotInPastOrTodayValidator } from '../../utils/date-util'; 

@Component({
    selector: 'app-consultation',
    standalone: true,
    templateUrl: './consultation.component.html',
    imports: [
        HeaderComponent,
        ReactiveFormsModule
    ],
    providers:[
      PatientService,
      ConsultationService
    ]
})
export class ConsultationComponent implements OnInit {
    
    consultationForm: FormGroup | undefined;
    idConsultation: string | null | undefined

    consultations: any = {};
    displayModal: boolean = false;
    rdvDialog: boolean = false
    submitted: boolean = false;
    idPatient: string = ""
    idSpecialist: string | undefined;

    constructor(
      private patientService: PatientService,
      private consultationService: ConsultationService,
      private route: ActivatedRoute,
      private location: Location
    ){}

    ngOnInit(): void {
        this.consultationForm = new FormGroup({
          cslID: new FormControl(''),
          patID: new FormControl({value: '', disabled: true}),
          firstName: new FormControl({value: '', disabled: true}),
          lastName: new FormControl({value: '', disabled: true}),
          agE: new FormControl({value: '', disabled: true}),
          phone: new FormControl({value: '', disabled: true}),
          email: new FormControl({value: '', disabled: true}),
          address: new FormControl({value: '', disabled: true}),
          job: new FormControl({value: '', disabled: true}),
          sanguinGrp: new FormControl({value: '', disabled: true}),
          statut: new FormControl(''),
          patientHistory: new FormControl(''),
          prescription: new FormControl(''),
          height: new FormControl(''),
          weight: new FormControl(''),
          temperature: new FormControl(''),
          diagnostic: new FormControl(''),
          dateRdv: new FormControl('', [dateNotInPastOrTodayValidator()]),
        });

        this.idConsultation = this.route.snapshot.paramMap.get('id');

        if (this.idConsultation) {
          this.consultationService.getConsultation(this.idConsultation).subscribe({
            next: (res) => {
              const idPatient = res.IDDOSSIERPATIENT;
              
              if (idPatient) {
                this.patientService.getPatient(idPatient).subscribe({
                  next: (data) => {
                    //console.log(data);
                    
                    const [heightValue, weightValue, temperatureValue] = res.CONSTANTE!.split("/");
                    // Formatez la date de naissance au format "yyyy-MM-dd" avant de la mettre dans le formulaire
                    const formattedDate = DateUtil.formatDate(data.DATENAISSPATIENT);
                    const dateRdv = DateUtil.formatDate(res.DATERDV!)
                    console.log(dateRdv);
                    
                    this.consultationForm?.patchValue({
                      cslID: res.IDCONSULTATION,
                      patID: data.IDDOSSIERPATIENT,
                      firstName: data.PRENOMSPATIENT,
                      lastName: data.NOMPATIENT,
                      agE: formattedDate,
                      phone: data.TELPATIENT,
                      email: data.EMAILPATIENT,
                      address: data.ADRESSEPATIENT,
                      job: data.PROFESSIONPATIENT,
                      sanguinGrp: data.GROUPESANGUIN,
                      patientHistory: res.ACTEMEDICAL,
                      height: heightValue,
                      weight: weightValue,
                      temperature: temperatureValue,
                      diagnostic: res.DIAGNOSTIC,
                      prescription: res.PRESCRIPTION,
                      dateRdv: dateRdv
                    });
                  },
                  error: (err) => {
                    console.error('Error fetching patient:', err);
                  },
                  complete: () => {
                    console.log('Patient data fetching completed');
                  }
                });
              }
            },
            error: (err) => {
              console.error('Error fetching consultation:', err);
            },
            complete: () => {
              console.log('Consultation data fetching completed');
            }
          });
        }


        
        //this.consultationService.updateConsultation()
      }

       // Méthode pour combiner les valeurs
  constantes(): string {
    const height = this.consultationForm?.get('height')?.value || '';
    const weight = this.consultationForm?.get('weight')?.value || '';
    const temperature = this.consultationForm?.get('temperature')?.value || '';

    return `${height}/${weight}/${temperature}`;
  }

       
    onSubmit(): void {
      if (this.consultationForm?.valid && this.consultations) {
        this.consultations.DIAGNOSTIC = this.consultationForm.get('diagnostic')?.value || '';
        this.consultations.STATUT = this.consultationForm.get('statut')?.value || 'PENDING';
        this.consultations.ACTEMEDICAL = this.consultationForm.get('patientHistory')?.value || '';
        this.consultations.PRESCRIPTION = this.consultationForm.get('prescription')?.value || '';
        this.consultations.CONSTANTE = this.constantes(); // Combine values here
        this.consultations.DATERDV = this.consultationForm.get('dateRdv')?.value || '';
  
      //console.log(this.consultationForm?.value);
      
      this.consultationService.updateConsultation(this.idConsultation!, this.consultations).subscribe({
        next: () => {
          console.log("Consultation Ok");
          this.goToBackPage()
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  goToBackPage(){
    this.location.back();
  }

  openNew(idSpecialist: string) {
    this.submitted = false;
    this.rdvDialog = true;
    //this.idPatient = id
  }
  hideDialog() {
    this.rdvDialog = false;
    this.submitted = false;
  }


}
