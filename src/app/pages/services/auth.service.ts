import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:3000/auth'; // URL de votre API Node.js

  constructor(private http: HttpClient) { }

  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password, role });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role); // Stocker le rôle de l'utilisateur
        }
      }));
  }
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });
    return this.http.post<any>(`${this.apiUrl}/change-password`, { oldPassword, newPassword }, { headers });
  }

  resetPassword(username: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { username, newPassword }, { headers });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
