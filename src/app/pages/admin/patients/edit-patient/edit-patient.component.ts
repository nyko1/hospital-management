import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-edit-patient',
    standalone: true,
    templateUrl: './edit-patient.component.html',
    styleUrl: './edit-patient.component.css',
    imports: [
      HeaderComponent,
      ReactiveFormsModule,
      ToastModule
    ],
    providers:[
      PatientService,
      MessageService
    ]
})
export class EditPatientComponent implements OnInit{

  idPatient: string | null | undefined 
  patientForm: FormGroup | undefined;
  alertMessage: any;


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private patientService: PatientService
    
  ){}

  ngOnInit(): void {
    
    
    this.patientForm = new FormGroup({
      IDDOSSIERPATIENT: new FormControl ({value:"", disabled:true}),
      NOMPATIENT: new FormControl (''),
      PRENOMSPATIENT: new FormControl (''),
      DATENAISSPATIENT: new FormControl (''),
      ADRESSEPATIENT: new FormControl (''),
      TELPATIENT: new FormControl (''),
      EMAILPATIENT: new FormControl ('', Validators.email),
      PROFESSIONPATIENT: new FormControl (''),
      ANTECEDENTPATIENT: new FormControl (''),
      GROUPESANGUIN: new FormControl ('')
    });
    //const formValue = this.patientForm!.value;
    this.idPatient = this.route.snapshot.paramMap.get('id')

    this.patientService.getPatient(this.idPatient!)
    .subscribe(
      data => {
        //console.log('get: ', data);
        
        this.patientForm!.patchValue(
          {IDDOSSIERPATIENT: data.IDDOSSIERPATIENT,
          NOMPATIENT: data.NOMPATIENT,
          PRENOMSPATIENT: data.PRENOMSPATIENT,
          DATENAISSPATIENT: data.DATENAISSPATIENT,
          ADRESSEPATIENT: data.ADRESSEPATIENT,
          TELPATIENT: data.TELPATIENT,
          EMAILPATIENT: data.EMAILPATIENT,
          PROFESSIONPATIENT: data.PROFESSIONPATIENT,
          ANTECEDENTPATIENT: data.ANTECEDENTPATIENT,
          GROUPESANGUIN: data.GROUPESANGUIN
        }
        )
      },
      error =>{
        console.error(error);
        
      }
    )
  }


  updatePatient(): void {
    if (this.patientForm!.valid && this.idPatient !== null) {
      this.patientService.updatePatient(this.idPatient!, this.patientForm!.value).subscribe(
        () => {
          this.patientForm!.reset();
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    }
  }

  goToBackPage(){
    this.location.back();
  }

  editPatient(){
    const formValues = this.patientForm!.value
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.updatePatient(
      id!, 
      formValues
    ).subscribe(
      res =>{
        this.show()
        setTimeout(() => {
          this.goToBackPage();
        }, 3000);
      },
      err =>{
        this.showError()
      }
    )
  }


  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit Succefuly' });
  }

  showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Edit' });
  }


}
