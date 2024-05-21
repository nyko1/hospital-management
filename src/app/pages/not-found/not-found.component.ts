import { Component, OnInit} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink,
    AdminComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{

  constructor(
    private router : Router,
    private location: Location
  ){}
  ngOnInit(){
    
  } 

  goToBackPage(){
    this.location.back();
  }

  

}
