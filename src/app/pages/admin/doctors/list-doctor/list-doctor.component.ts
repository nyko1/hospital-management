import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../../footer/footer.component";


import { Product } from '../../../../../domain/product';
import { ProductService } from '../../../../../service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { response } from 'express';


@Component({
    selector: 'app-list-doctor',
    standalone: true,
    templateUrl: './list-doctor.component.html',
    providers: [
        ProductService,
        AuthService
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
    ]
})
export class ListDoctorComponent implements OnInit{
    products!: Product[];
    userInfo: any;
    
    ngOnInit(): void {
        this.productService.getProducts().then((data) => {
            this.products = data;
        });
        
        // Get Users
        this.authService.getUsers()
            .subscribe(
                response =>{
                    this.userInfo = response
                }
            )
    }
    constructor(
        private productService: ProductService,
        private authService: AuthService
    ) {}
    
}
