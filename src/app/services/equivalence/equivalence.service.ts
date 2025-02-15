import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Equivalence {
  equivalenceId: number;
  schoolName: string;
  academicLevel: string;
  isiCoursesJson: string; // JSON string representation
  srtCoursesJson: string; // JSON string representation
  isiCourses: { [key: string]: string[] }; // Dictionary of course categories and their courses
  srtCourses: { [key: string]: string[] }; // Dictionary of course categories and their courses
}


@Injectable({
  providedIn: 'root'
})
export class EquivalenceService {
  private apiUrl = 'http://localhost:8080/iusj-ects/api/equivalence/all-equivalence';
  constructor(private http: HttpClient) { }

  fetchFiles(): Observable<Equivalence[]> {
    return this.http.get<Equivalence[]>(this.apiUrl);
  }
  addEquivalence(
    schoolName: string,
    academicLevel: string,
    type: string,
    newCourses: { [key: string]: string[] }
  ): Observable<string> {
    // Concatenate URL with query parameters
    const url = `${this.apiUrl}/add-equivalence?schoolName=${schoolName}&academicLevel=${academicLevel}&type=${type}`;
    
    // Convert newCourses to JSON string
    const jsonString = JSON.stringify(newCourses, null, 2); // null, 2 makes it readable
    console.log("jsonString", jsonString);
  
    // Send POST request
    return this.http.post<string>(url, jsonString, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });
  }
  
  
}
