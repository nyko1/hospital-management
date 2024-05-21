import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  private apiUrl = 'http://localhost:3000/specialist'; // URL de votre API Node.js

  constructor(private http: HttpClient) { }
  
  addSpecialist(idspecialiste: string, nomspecialiste: string, 
    prenomspecialiste: string, specialite: string, gradespecialiste: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-specialist`, { idspecialiste, nomspecialiste, 
      prenomspecialiste,  specialite, gradespecialiste});
  }

  getSpecialists(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/list-specialist`)
  }
}

