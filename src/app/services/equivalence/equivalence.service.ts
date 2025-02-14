import { HttpClient } from '@angular/common/http';
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
}
