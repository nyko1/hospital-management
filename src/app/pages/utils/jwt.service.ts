import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class JwtService {
  
    constructor() {}
  
    decodeJWT(token: string): any {
        try {
          const base64Url = token.split('.')[1]; // JWT est composé de Header, Payload et Signature
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
      
          const decoded = JSON.parse(jsonPayload);
          return decoded;
        } catch (e) {
          console.error("Failed to decode JWT:", e);
          return null;
        }
      }
      
  }
  