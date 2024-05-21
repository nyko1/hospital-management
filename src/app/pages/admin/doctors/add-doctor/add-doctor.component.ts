import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importer ReactiveFormsModule
import { startWith } from 'rxjs/operators'; // Importer startWith et combineLatest
import { SpecialistService } from '../../../services/specialist.service';
import { AuthService } from '../../../services/auth.service';




@Component({
    selector: 'app-add-doctor',
    standalone: true,
    templateUrl: './add-doctor.component.html',
    imports: [
        RouterLink,
        HeaderComponent,
        ReactiveFormsModule,
        
    ],
    providers:[
        SpecialistService
    ]
})
export class AddDoctorComponent implements OnInit{

    specialistForm: FormGroup | undefined;
    loading = false;
    errorMessage: string | undefined;
    formSubmitted = false;
    alertMessage: string | undefined;

    constructor(
        private specialistService: SpecialistService, 
        private fb: FormBuilder,
        private authService: AuthService 
        
    ) {}

    ngOnInit(): void {

               
        this.specialistForm = this.fb.group({
          idSpecialist: [{ value: '', disabled: true }],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          grade: ['', Validators.required],
          speciality: ['', Validators.required],
          userName: [{ value: '', disabled: true }],
          password: ['', Validators.required]
        });
    
        // Abonnez-vous aux changements de valeur des champs firstName et lastName
        this.specialistForm.get('firstName')?.valueChanges.pipe(startWith('')).subscribe(() => {
          this.generateUserName();
        });
    
        this.specialistForm.get('lastName')?.valueChanges.pipe(startWith('')).subscribe(() => {
          this.generateUserName();
        });
    }    
    
    generateUserName() {
        let firstName = this.specialistForm!.get('firstName')?.value || '';
        let lastName = this.specialistForm!.get('lastName')?.value || '';

        // Vérifier si les prénoms et noms contiennent des espaces
        if (firstName.includes(' ') || lastName.includes(' ')) {
            // Prendre le premier mot avant un espace, le cas échéant
            firstName = firstName.split(' ')[0];
            lastName = lastName.split(' ')[0];
        }
        // Supprimer les apostrophes
        firstName = firstName.replace(/'/g, '');
        lastName = lastName.replace(/'/g, '');
        const username = `${firstName}.${lastName}`.toLowerCase();
        this.specialistForm!.get('userName')?.setValue(username);
    }

    generateIdSpecialist() {
        const speciality = this.specialistForm!.get('speciality')?.value || '';
        const prefix = speciality.substring(0, 3).toUpperCase();
        const uniqueSuffix = Math.random().toString(36).substring(2, 14).toUpperCase();
        const idSpecialist = prefix + uniqueSuffix;
        this.specialistForm!.get('idSpecialist')?.setValue(idSpecialist);
      }
    
    onSubmit() {
        this.formSubmitted = true
        if (this.specialistForm!.valid) {
            // Préparer les données specialite à partir des données du formulaire
            const formData = this.specialistForm!.getRawValue()
            
            const specialistData ={
                idspecialiste: formData.idSpecialist,
                nomspecialiste: formData.lastName,
                prenomspecialiste: formData.firstName,
                specialite: formData.speciality,
                gradespecialiste: formData.grade
            };
            console.log(specialistData);
            
            
            // Préparer les données utilisateur à partir des données du formulaire
            const userData = {
                iduser: formData.idSpecialist,
                username: formData.userName,
                motdepasse: formData.password,
                role: formData.speciality
            };

           //     console.log('Specialist created:', response);
            
            this.specialistService.addSpecialist(specialistData.idspecialiste, specialistData.nomspecialiste, 
                specialistData.prenomspecialiste, specialistData.specialite, specialistData.gradespecialiste)
                    .subscribe(response =>{
                this.loading = false;
                console.log('Specialist created:',response);
                
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Login failed. Please check your credentials and try again.';
                console.error('Login failed', error);
                this.alertMessage = `Echec de l\'Enregistrement de ${specialistData.nomspecialiste}`;
              }
            );
            
            
            // Deuxième requête pour enregistrer les informations utilisateur
            this.authService.register(userData.iduser, userData.username, userData.motdepasse, userData.role).subscribe(
                response =>{
                    console.log('User add: ', response)
                },
                error => {
                    this.loading = false;
                    this.errorMessage = 'resgister failed. Please check your credentials and try again.';
                    console.error('register failed', error);
                    this.alertMessage = `Echec de l\'Enregistrement de ${userData.username}`;
                  }  
            )
            this.specialistForm?.reset()
            this.alertMessage = '';
        }else {
            this.alertMessage = 'Tous les champs sont obligatoires. Veuillez les remplir avant de soumettre le formulaire.';
            }
        
        this.formSubmitted = false;
    }



}
