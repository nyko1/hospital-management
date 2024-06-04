import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { ConsultationService } from '../../services/consultation.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

    constructor(
      private patientService: PatientService,
      private consultationService: ConsultationService,
      private route: ActivatedRoute
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
          height: new FormControl(''),
          weight: new FormControl(''),
          temperature: new FormControl(''),
          diagnostic: new FormControl(''),
          inputRdv: new FormControl('')
        });

        this.idConsultation = this.route.snapshot.paramMap.get('id')
        this.consultationService.getConsultation(this.idConsultation!).subscribe(
          res =>{
            const idPatient = res.IDDOSSIERPATIENT
            this.patientService.getPatient(idPatient!)
        .subscribe(
          data =>{
            this.consultationForm?.patchValue(
              {
                cslID : res.IDCONSULTATION,
                patID: data.IDDOSSIERPATIENT,
                firstName: data.PRENOMSPATIENT,
                lastName: data.NOMPATIENT,
                agE: data.DATENAISSPATIENT,
                phone: data.TELPATIENT,
                email: data.EMAILPATIENT,
                address: data.ADRESSEPATIENT,
                job: data.PROFESSIONPATIENT,
                sanguinGrp: data.GROUPESANGUIN,
                patientHistory: data.ANTECEDENTPATIENT
              }
            )
          },
          err =>{
            console.error(err);
            
          }
        )
          },
          err =>{
            console.error(err);
            
          }
        )

        
        //this.consultationService.updateConsultation()
      }



      
    onSubmit(): void {
    if (this.consultationForm!.valid) {
      //console.log(this.consultationForm?.value);
      
      this.consultationService.updateConsultation(this.idConsultation!, this.consultationForm?.value).subscribe(
        () => {
          console.log("Consultation Ok");
          Location
          
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    }
  }

}
