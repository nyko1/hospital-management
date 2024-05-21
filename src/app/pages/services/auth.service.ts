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

  register(iduser: string, username: string, password: string, role: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.post<any>(`${this.apiUrl}/register`, { iduser, username, password, role }, {headers});
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!localStorage.getItem('token');
  }

  private getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    return localStorage.getItem('token');
  }

    // Obtient la liste rôle de l'utilisateur depuis la bd
    getRole(): string | null {
      if (typeof window === 'undefined') {
        return null;
      }
      
      const role = localStorage.getItem('role');
      return role ? role : null;
    }
    
    

    getUsers(): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/users`);
    }
}