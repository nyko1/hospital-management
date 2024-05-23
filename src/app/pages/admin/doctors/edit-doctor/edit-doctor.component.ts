import { Component, Injectable, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpecialistService } from '../../../services/specialist.service';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
    selector: 'app-edit-doctor',
    standalone: true,
    templateUrl: './edit-doctor.component.html',
    imports: [
      HeaderComponent,
      RouterLink,
      ReactiveFormsModule,
      ToastModule
    ],
    providers:[
      SpecialistService,
      AuthService,
      MessageService
    ]
})
export class EditDoctorComponent implements OnInit {

  id: string | null | undefined;
  specialists: any;
  users: any;
  
  specialistForm: FormGroup | undefined ;
  loading = false;
  errorMessage: string | undefined;
  formSubmitted = false;
  alertMessage: string | undefined;
  userForm: FormGroup | undefined;
  idUser: string | undefined

  ngOnInit(): void {

    this.specialistForm = new FormGroup({
      idSpecialist: new FormControl({value: '', disabled: true}, Validators.required),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      grade: new FormControl(''),
      speciality: new FormControl(''),
      userName: new FormControl({value: '', disabled: true}, Validators.required),
    });

    this.userForm = new FormGroup({
      password: new FormControl('', Validators.required)
    });
    
    

    this.id = this.route.snapshot.paramMap.get('id');
    // Charger les données du spécialiste à partir de l'ID

    this.specialistService.getSpecialistById(this.id!)
            .subscribe(
                response =>{
                  this.authService.getUserById(this.id!)
                  .subscribe(
                      data =>{
                          this.specialistForm!.patchValue({
                            idSpecialist: response[0].IDSPECIALISTE,
                            firstName: response[0].PRENOMSPECIALISTE,
                            lastName: response[0].NOMSPECIALISTE,
                            grade: response[0].GRADESPECIALISTE,
                            speciality: response[0].SPECIALITE,
                            userName: data.USERNAME
                            // Do not set password for security reasons
                          });
                          this.idUser = response[0].IDSPECIALISTE
                      }
                  )
                }
            )

  }

  constructor(
    private route: ActivatedRoute,
    private specialistService: SpecialistService,
    private authService: AuthService,
    private messageService: MessageService

  ){}

  onSubmit() {
    const formValue = this.specialistForm!.value;
      this.specialistService.updateSpecialist(
        this.id!,
        formValue.lastName,
        formValue.firstName,
        formValue.speciality,
        formValue.grade
      ).subscribe(
        response => {
          this.show()
          // Handle response here
        },
        error => {
          // Handle errors here
          this.showError()
        }
      );
    }
  

  resetPassword(){
    const formValue = this.userForm!.value;
    this.authService.resetPassword(
      this.idUser!,
      formValue.password
    ).subscribe(
      res =>{
        this.showPassword()
      },
      error =>{
        this.showError()
      }
    )
  }

  showPassword() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password reset Succefuly' });
    }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit Succefuly' });
  }

  showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Edit' });
  }
  

}
