import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EquivalenceService } from '../../services/equivalence/equivalence.service';
@Component({
  selector: 'app-equivalence-modal',
  templateUrl: './equivalence-modal.component.html',
  styleUrl: './equivalence-modal.component.scss',
    standalone: true,
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
export class EquivalenceModalComponent {
 @Input() visible: boolean = false;
  @Input() title: string = 'Modal Title';
  @Input() content: string = 'This is the default content.';
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  

  schoolNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  academicLevelControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  typeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  courseControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  codeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  equivalenceControl =  new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  // newCourses: { [key: string]: string[] } = {};

  fullName: string = "";
  addedCourses: string[] = []; // Stores selected courses
  // Form Control for autocomplete
  classLevelControl= new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  constructor(private overlayContainer: OverlayContainer, private equivalenceService: EquivalenceService) {}
  // Options for autocomplete
  options: string[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  ngOnInit() {
    this.overlayContainer.getContainerElement().classList.add('custom-autocomplete-container');
  }



  // addCourse() {
  //   const courseCode = this.courseCodeControl.value;
  //   const equivalence = this.equivalenceControl.value;

  //   if (courseCode && equivalence) {
  //     if (!this.newCourses[courseCode]) {
  //       this.newCourses[courseCode] = [];
  //     }
  //     this.newCourses[courseCode].push(equivalence);
  //     this.equivalenceControl.setValue('');
  //   }
  // }

  save() {
    const schoolName = this.schoolNameControl.value?.trim();
    const academicLevel = this.academicLevelControl.value;
    const type = this.typeControl.value;
    const courseName = this.courseControl.value;
    const code = this.codeControl.value;


    if (!schoolName || !academicLevel || !type ) {
      alert('Please fill in all fields and add at least one course equivalence.');
      return;
    }
    console.log("schoolname", schoolName)
    console.log("academicLevel", academicLevel)
    console.log("type", type)
    console.log("courseName", courseName)
    console.log("code", code)
    this.fullName = code?.trim() + "-" + courseName?.trim();
    console.log("fullName", this.fullName);

    let newCourse: { [key: string]: string[] } = {
      [this.fullName]: this.addedCourses // Use square brackets to define dynamic key
    };

    console.log("newCourses", newCourse)


    this.equivalenceService.addEquivalence(schoolName, academicLevel, type, newCourse)
      .subscribe(
        response => {
          console.log('Equivalence added successfully:', response);
          alert('Equivalence saved successfully!');
        },
        error => {
          console.error('Error saving equivalence:', error);
          alert('Failed to save equivalence.');
        }
      );
  }












  // Filtered options observable
  filteredOptions: Observable<string[]> = this.classLevelControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || ''))
  );

  // Handle option selection
  onOptionSelected(event: any): void {
    console.log('Selected option:', event.option.value);
  }

  // Filter method
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Close modal
  close(): void {
    this.onClose.emit();
  }



  fileName: string = ''; // Variable to store the file name

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default behavior to allow drop
    const dragArea = document.getElementById('drag-area');
    if (dragArea) {
      dragArea.classList.add('dragging'); // Add visual feedback while dragging
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dragArea = document.getElementById('drag-area');
    if (dragArea) {
      dragArea.classList.remove('dragging'); // Remove visual feedback after drop
    }

    // Get the dropped files
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(files: FileList) {
    const file = files[0]; // Handle the first file (if multiple files are allowed, you can change this)
    this.fileName = file.name; // Set the file name
    console.log(file); // Optional: log the file object
  }
  addCourse() {
    const course = this.equivalenceControl.value;
    if (course && !this.addedCourses.includes(course)) {
      this.addedCourses.push(course);
      this.classLevelControl.setValue(''); // Clear input field
    }
  }
  removeCourse(index: number) {
    this.addedCourses.splice(index, 1); // Remove course from the list
  }
}
