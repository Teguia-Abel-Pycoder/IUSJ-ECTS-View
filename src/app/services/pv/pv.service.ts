import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FileData {
  fileId: number;
  classLevel: string;
  semester: string;
  filePath: string;
  academicYear: string;
  uploadedBy: string;
  category: string;
  uploadedTime: string;
}

@Injectable({
  providedIn: 'root'
})  
export class PvService {
  private apiUrl = 'http://localhost:8080/iusj-ects/api/file/all';

  constructor(private http: HttpClient) {}

  getFiles(category?: string, classLevel?: string, semester?: string, academicYear?: string): Observable<FileData[]> {
    let params = new HttpParams();
    
    if (category) params = params.set('category', category);
    if (classLevel) params = params.set('classLevel', classLevel);
    if (semester) params = params.set('semester', semester);
    if (academicYear) params = params.set('academicYear', academicYear);

    return this.http.get<FileData[]>(this.apiUrl, { params });
  }
}
