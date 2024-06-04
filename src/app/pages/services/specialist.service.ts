import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Specialist {
  idspecialiste: string;
  nomspecialiste: string;
  prenomspecialiste: string;
  specialite: string;
  gradespecialiste: string;
}

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
    return this.http.get<any>(`${this.apiUrl}/list-specialists`)
  }
  getAllSpecialists(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/list-specialist`)
  }

  getSpecialistById(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  getDoctorCount(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/count-doctor`)
  }

  getStaffCount(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/count-staff`)
  }

  updateSpecialist(idspecialiste: string, nomspecialiste: string, 
    prenomspecialiste: string, specialite: string, gradespecialiste: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-specialist/${idspecialiste}`, { 
      nomspecialiste, prenomspecialiste, specialite, gradespecialiste });
  }

  deleteSpecialist(idspecialiste: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-specialist/${idspecialiste}`);
  }

  getSpecialistsBySpeciality(speciality: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list-specialist/${speciality}`);
  }

  getSpecialities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list-specialities`);
  }



}

