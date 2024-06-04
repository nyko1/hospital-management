import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { ConsultationService } from '../../services/consultation.service';
import { ActivatedRoute } from '@angular/router';

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

    constructor(
      private patientService: PatientService,
      private consultationService: ConsultationService,
      private route: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.consultationForm = new FormGroup({
          patID: new FormControl({value: '', disabled: true}),
          firstName: new FormControl({value: '', disabled: true}),
          lastName: new FormControl({value: '', disabled: true}),
          agE: new FormControl({value: '', disabled: true}),
          phone: new FormControl({value: '', disabled: true}),
          email: new FormControl({value: '', disabled: true}),
          address: new FormControl({value: '', disabled: true}),
          job: new FormControl({value: '', disabled: true}),
          sanguinGrp: new FormControl({value: '', disabled: true}),
          patientHistory: new FormControl(''),
          height: new FormControl(['', Validators.required]),
          weight: new FormControl(['', Validators.required]),
          temperature: new FormControl(['', Validators.required]),
          diagnostic: new FormControl(['', Validators.required]),
          inputRdv: new FormControl('')
        });

        const idPatient = this.route.snapshot.paramMap.get('id')

        this.patientService.getPatient(idPatient!)
        .subscribe(
          data =>{
            this.consultationForm?.patchValue(
              {
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
      }
      
    onSubmit() {
    
    }

}
