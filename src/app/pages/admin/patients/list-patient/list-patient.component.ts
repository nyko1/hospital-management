import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '.././../header/header.component';


import { Product } from '../../../../../domain/product';
import { ProductService } from '../../../../../service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-list-patient',
  standalone: true,
  providers: [
    ProductService,
    MessageService
  ],
  imports: [
    RouterLink,
    HeaderComponent,
    TableModule, 
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './list-patient.component.html',
})
export class ListPatientComponent  implements OnInit{
  products!: Product[];
  displayModal: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService,
    
  ) {}

  ngOnInit() {
    
      this.productService.getProducts().then((data) => {
          this.products = data;
      });
  }

  editPatient(idPatient: string){
    this.router.navigate(['admin/edit-patient', idPatient])
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete Succefuly' });
  }

  showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Delete' });
  }

  // onDelete() {
  //   this.specialistService.deleteSpecialist(this.selectedSpecialistId!).subscribe(() => {
  //       this.authService.deleteUser(this.selectedSpecialistId!).subscribe(()=>{
  //           console.log('Specialist deleted successfully');
  //           this.loadSpecialists()
  //           this.displayModal = false; // Fermer le modal après la suppression
  //           this.show()
  //       },
  //       error =>{
  //           console.error('Error deleting specialist:', error);
  //           this.showError
  //       }
  //   )
      

  //   }, error => {
  //     console.error('Error deleting specialist:', error);
  //     this.showError
  //   });
  // }

  // confirmDelete(idspecialiste: string) {
  //   this.selectedSpecialistId = idspecialiste;
  //   this.displayModal = true;
  // }

  

  
}
