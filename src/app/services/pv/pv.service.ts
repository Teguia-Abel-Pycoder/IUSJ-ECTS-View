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

  constructor(private http: HttpClient) { }

  fetchFiles(): Observable<FileData[]> {
    return this.http.get<FileData[]>(this.apiUrl);
  }
}
