import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileData, PvService } from '../../services/pv/pv.service';

@Component({
  selector: 'app-pv-modal',
  standalone: true,
  templateUrl: './pv-modal.component.html',
  styleUrls: ['./pv-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class PvModalComponent {
  @Input() visible: boolean = false;
  @Input() title: string = 'Modal Title';
  @Input() id: string | null = null;
  @Input() fileData: FileData | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();

  options: string[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Form controls for inputs
  classLevelControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  academicYearControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  semesterControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  // Define available options for each field
  classLevelOptions: string[] = ['ISI1', 'ISI2', 'ISI3'];
  academicYearOptions: string[] = ['2023-2024', '2024-2025'];
  semesterOptions: string[] = ['SEMESTER1', 'SEMESTER2'];

  // Define filtered options for each field
  filteredClassLevels: Observable<string[]>;
  filteredAcademicYears: Observable<string[]>;
  filteredSemesters: Observable<string[]>;

  // For storing file and file name
  fileName: string = '';
  selectedFile: File | null = null;

  // Flag to enable or disable save button
  isSaveEnabled: boolean = false;

  constructor(private http: HttpClient, private fileService:  PvService) {
    // Set up filtered options to listen for changes in input
    this.filteredClassLevels = this.classLevelControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value, this.classLevelOptions))
    );

    this.filteredAcademicYears = this.academicYearControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value, this.academicYearOptions))
    );

    this.filteredSemesters = this.semesterControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value, this.semesterOptions))
    );
  }

  // Method to check if all fields are valid
  isFormValid(): boolean {
    return this.classLevelControl.valid &&
           this.academicYearControl.valid &&
           this.semesterControl.valid &&
           !!this.selectedFile;  // Ensure a file is selected
  }

  // Update save button state based on form validity
  updateSaveButtonState(): void {
    this.isSaveEnabled = this.isFormValid();
  }

  // Method to filter options based on user input
  filterOptions(value: string | null, options: string[]): string[] {
    const filterValue = (value || '').toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Handle file input and set the file name
  handleFiles(files: FileList) {
    const file = files[0];
    this.selectedFile = file;
    this.fileName = file.name;
    this.updateSaveButtonState();  // Update button state after file selection
  }

  ngOnChanges() {
    if (this.fileData) {
      this.classLevelControl.setValue(this.fileData.classLevel);
      this.academicYearControl.setValue(this.fileData.academicYear);
      this.semesterControl.setValue(this.fileData.semester);
      this.fileName = this.fileData.filePath || '';
    }
  }

  // Save function to handle form submission
  save(): void {
    let apiUrl = '';
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    const fileDetails = {
      classLevel: this.classLevelControl.value,
      semester: this.semesterControl.value,
      academicYear: this.academicYearControl.value,
      uploadedBy: 'John Doe',
      category: 'PV'
    };

    formData.append('fileDetails', new Blob([JSON.stringify(fileDetails)], { type: 'application/json' }));

    if (this.fileData?.fileId) {
      if (this.isFormValid()) {
        apiUrl = `http://localhost:8080/iusj-ects/api/file/update/${this.fileData?.fileId}`;
        this.http.put(apiUrl, formData).subscribe({
          next: (response) => {
            console.log('File updated successfully', response);
            this.onSave.emit(); // Notify parent component
          },
          error: (error) => {
            console.error('Error updating file', error);
            alert('Error updating file.');
          }
        });
      }
    } 
    else if (this.isFormValid()) {
      apiUrl = 'http://localhost:8080/iusj-ects/api/file/create';
      this.http.post(apiUrl, formData).subscribe({
        next: (response) => {
          console.log('File uploaded successfully', response);
          this.onSave.emit(); // Notify parent component
        },
        error: (error) => {
          console.error('Error uploading file', error);
          alert('Error uploading file.');
        }
      });
    } 
    else {
      alert('Please ensure all fields are valid and a file is selected.');
    }
  }

  // Close the modal
  close(): void {
    this.onClose.emit();
    this.fileName = "";
  }

  // Handle drag over for drag-and-drop functionality
  onDragOver(event: DragEvent) {
    event.preventDefault();
    const dragArea = document.getElementById('drag-area');
    if (dragArea) {
      dragArea.classList.add('dragging');
    }
  }

  // Handle file drop for drag-and-drop functionality
  onDrop(event: DragEvent) {
    event.preventDefault();
    const dragArea = document.getElementById('drag-area');
    if (dragArea) {
      dragArea.classList.remove('dragging');
    }
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.fileName = file.name;
      this.updateSaveButtonState();  // Update button state after file selection
    }
  }

  // Method for handling field change events (for example, input or selection change)
  onFieldChange() {
    this.updateSaveButtonState();  // Update button state after field change
  }
}
