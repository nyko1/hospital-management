// consultation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../models/consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = 'http://localhost/API_PHP/consultation.php'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Create
  createConsultation(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(this.apiUrl, consultation);
  }

  // Read
  getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.apiUrl);
  }

  getConsultation(id: string): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/consultation/${id}`);
  }

  // Update
  updateConsultation(id: string, consultation: Consultation): Observable<Consultation> {
    return this.http.put<Consultation>(`${this.apiUrl}/update-consultation/${id}`, consultation);
  }

  // Delete
  deleteConsultation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
