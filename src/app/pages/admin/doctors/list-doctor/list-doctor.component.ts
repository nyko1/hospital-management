import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../../footer/footer.component";


import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SpecialistService } from '../../../services/specialist.service';
import { AuthService } from '../../../services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
    selector: 'app-list-doctor',
    standalone: true,
    templateUrl: './list-doctor.component.html',
    providers: [
        SpecialistService,
        AuthService,
        MessageService
    ],
    imports: [
        RouterLink,
        HeaderComponent,
        FooterComponent,
        TableModule, 
        CommonModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        ToastModule
    ]
})
export class ListDoctorComponent implements OnInit{
    specialists: any;
    displayModal: boolean = false;
    selectedSpecialistId: string | undefined;
    
    ngOnInit(): void {
        // Get Users
        this.specialistService.getSpecialists()
            .subscribe(
                response =>{
                    this.specialists = response
                }
            )
    }
    constructor(
        private specialistService: SpecialistService,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {}
    

    editSpecialist(specialistId: string): void {
        this.router.navigate(['admin/edit-doctor', specialistId]); // Navigue vers le formulaire d'édition
    }

    confirmDelete(idspecialiste: string) {
        this.selectedSpecialistId = idspecialiste;
        this.displayModal = true;
      }

      onDelete() {
        this.specialistService.deleteSpecialist(this.selectedSpecialistId!).subscribe(() => {
            this.authService.deleteUser(this.selectedSpecialistId!).subscribe(()=>{
                console.log('Specialist deleted successfully');
                this.loadSpecialists()
                this.displayModal = false; // Fermer le modal après la suppression
                this.show()
            },
            error =>{
                console.error('Error deleting specialist:', error);
                this.showError
            }
        )
          

        }, error => {
          console.error('Error deleting specialist:', error);
          this.showError
        });
      }


      show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete Succefuly' });
      }
    
      showError() {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Delete' });
      }

      loadSpecialists() {
        this.specialistService.getSpecialists().subscribe(specialists => {
          this.specialists = specialists;
        });
      }
      
}
