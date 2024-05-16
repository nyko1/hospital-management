import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '.././../header/header.component';


import { Product } from '../../../../../domain/product';
import { ProductService } from '../../../../../service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


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
  ],
  templateUrl: './list-patient.component.html',
})
export class ListPatientComponent  implements OnInit{
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    
      this.productService.getProducts().then((data) => {
          this.products = data;
      });
  }

  
}
