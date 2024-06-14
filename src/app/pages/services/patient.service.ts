import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


interface Patient {
  IDDOSSIERPATIENT: string;
  NOMPATIENT: string;
  PRENOMSPATIENT: string;
  DATENAISSPATIENT: string;
  ADRESSEPATIENT: string;
  TELPATIENT: string;
  EMAILPATIENT: string;
  PROFESSIONPATIENT: string;
  ANTECEDENTPATIENT: string;
  GROUPESANGUIN: string;
}


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:3000/api/patient';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patient-list`)
      .pipe(catchError(this.handleError));
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/create`, patient)
      .pipe(catchError(this.handleError));
  }

  updatePatient(id: string, patient: Patient): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, patient)
      .pipe(catchError(this.handleError));
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  getDailyPatientCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/count/daily`)
      .pipe(catchError(this.handleError));
  }

  getTotalPatientCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/count/total`)
      .pipe(catchError(this.handleError));
  }

  getAveragePatient(): Observable<any> {
    return this.http.get(`${this.apiUrl}/average`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something bad happened; please try again later.');
  }
}
