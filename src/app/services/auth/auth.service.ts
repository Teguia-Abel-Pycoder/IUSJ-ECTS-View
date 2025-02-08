import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private apiUrl1 = 'http://localhost:8080/api';


  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post<{ text: string }>(this.apiUrl, loginData).pipe(
      map((response) => {
        const token = response.text;  // Extract token as string
        console.log("Saving token to localStorage:", token);  // Ensure this is a string (JWT token)
        localStorage.setItem('token', token);  // Store token in localStorage
  
        console.log("Stored token in localStorage:", localStorage.getItem('token'));  // Verify stored token
        return token;
      }),
      switchMap((token) => this.getUserFromToken(token)),  // Use the token to get the user
      tap((user) => {
        this.saveUserInSession(user);  // Save the user in sessionStorage
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }
  
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log("Retrieved token:", token);  // Log the token retrieved from localStorage
    return token;  // Should return the token string if stored correctly
  }
  

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  navigateToUserboard(): void {
    this.router.navigate(['/uSerboard']);
  }

  getUserFromToken(token: string): Observable<any> {
    if (!token) {
      return throwError(() => new Error('No token found in localStorage.'));
    }
  
    const url = `${this.apiUrl1}/user/get-user-from-token?token=${token}`; // Append token as query parameter
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    });
  
    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Failed to fetch user from token.'));
      })
    );
  }

  saveUserInSession(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromSession(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token
    sessionStorage.removeItem('user'); // Remove user from sessionStorage
  }
  
}
