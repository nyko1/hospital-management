import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../../footer/footer.component";


import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SpecialistService } from '../../../services/specialist.service';


@Component({
    selector: 'app-list-doctor',
    standalone: true,
    templateUrl: './list-doctor.component.html',
    providers: [
        SpecialistService
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
    specialists: any;
    
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
        private specialistService: SpecialistService
    ) {}
    
}
