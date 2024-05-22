import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';


import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';


import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  providers: [ProductService],
  imports: [
    RouterLink,
    HeaderComponent,
    TableModule, 
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    ButtonModule,

    
    DialogModule, 
    RippleModule, 
    ToastModule, 
    ToolbarModule, 
    ConfirmDialogModule, 
    InputTextareaModule, 
    FileUploadModule, 
    DropdownModule, 
    TagModule, 
    RadioButtonModule, 
    RatingModule, 
    InputNumberModule
  ],
  templateUrl: './list-patient.component.html',
  styles: [
    `:host ::ng-deep .p-dialog{
        margin: 0 auto 2rem auto;
        display: inline-block; 
        width: auto;;
    }`
]
})
export class ListPatientComponent  implements OnInit{
  products!: Product[];
  product!: Product;

  productDialog: boolean = false;
  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];
  modalTitle: string | undefined

  constructor(private productService: ProductService) {}

  ngOnInit() {
    
      this.productService.getProducts().then((data) => {
          this.products = data;
      });
  }

  openNew(title: string) {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
    this.modalTitle = title
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  
}
