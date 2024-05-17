import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/productservice';
import { Product } from '../../../domain/product';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../specialist/header/header.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-appointement',
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
  templateUrl: './appointement.component.html',
})
export class AppointementComponent implements OnInit{
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
