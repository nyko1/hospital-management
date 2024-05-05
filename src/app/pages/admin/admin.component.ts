import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [
        HeaderComponent,
        RouterLink,
        FooterComponent
    ]
})
export class AdminComponent implements OnInit{
  constructor(

  ){}
  ngOnInit() {
    
  }
}
