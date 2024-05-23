import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-profil',
    standalone: true,
    templateUrl: './edit-profil.component.html',
    imports: [
        HeaderComponent, 
        FooterComponent,
        ReactiveFormsModule,
        ToastModule

    ],
    providers: [
        AuthService,
        MessageService
    ]

})
export class EditProfilComponent implements OnInit {

    users: AuthService | undefined;
    loading = false;
    errorMessage: string | undefined;
    //formSubmitted = false;
    alertMessage: string | undefined;
    userForm: FormGroup | undefined;
    idUser: string | undefined | null


    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private route: ActivatedRoute,

    ){}
    
    ngOnInit(): void {
        this.idUser = this.route.snapshot.paramMap.get('id');

        this.userForm = new FormGroup({
            userName: new FormControl({value:'', disabled: true },Validators.required),
            oldPassword: new FormControl('', Validators.required),
            newPassword: new FormControl('', Validators.required),
          });

          this.authService.getUserById(this.idUser!)
          .subscribe(
              data =>{
                  this.userForm!.patchValue({
                    userName: data.USERNAME
                    // Do not set password for security reasons
                  });
                  
              }
          )
    }

    onSubmit(){
        if (this.userForm?.valid) {
            const formValue = this.userForm.value;
            this.authService.changePassword(this.idUser!, formValue.oldPassword, formValue.newPassword)
                .subscribe(()=> {
                    this.show()
                    this.userForm?.reset()
                }, error =>{
                    this.showError()
                }
            )
        }else {
            this.userForm?.markAllAsTouched(); // Marque tous les champs comme touchés pour montrer les erreurs de validation
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please correct the errors in the form.' });
        }
    }


    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Change password Succefuly' });
      }

      showError() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Change' });
    }



}
