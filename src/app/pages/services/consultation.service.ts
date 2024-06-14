// consultation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../models/consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = 'http://localhost:3000/api/consultation'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Create
  createConsultation(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(`${this.apiUrl}/create`, consultation);
  }

  // Read
  getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/consultation-list`);
  }
  
  getAppointement(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/appointement-list`);
  }

  getConsultation(id: string): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/${id}`);
  }

  // Update
  updateConsultation(id: string, consultation: Consultation): Observable<Consultation> {
    return this.http.put<Consultation>(`${this.apiUrl}/update/${id}`, consultation);
  }

  // Delete
  deleteConsultation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
