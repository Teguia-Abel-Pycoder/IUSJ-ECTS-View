import { Component } from '@angular/core';
import { Equivalence, EquivalenceService } from '../../services/equivalence/equivalence.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-equivalence',
  standalone: false,
  
  templateUrl: './equivalence.component.html',
  styleUrl: './equivalence.component.scss'
})
export class EquivalenceComponent {
equivalences: Equivalence[] = [];
schoolNameControl = new FormControl('');
academicLevelControl = new FormControl('');
typeControl = new FormControl('');
courseCodeControl = new FormControl('');
equivalenceControl = new FormControl('');
newCourses: { [key: string]: string[] } = {};



  searchQuery: string = '';
filterStudents(query: string) {
throw new Error('Method not implemented.');
}
deleteSelectedArtists() {
throw new Error('Method not implemented.');
}
sortedFiles = [
  // Example file structure
  { classLevel: 'Level 1', semester: 'Fall', academicYear: '2025', uploadedBy: 'John', uploadedTime: new Date() },
  // Add more files here
];
constructor(private http: HttpClient, private equivalenceService:  EquivalenceService) {}
// Array to track which file has its options panel displayed
showOptions: boolean[] = [];

ngOnInit() {
  this.fetchEquivalences();
  console.log("this.equivalences", this.equivalences);
}

fetchEquivalences(): void {
  this.equivalenceService.fetchFiles().subscribe(data => {
    this.equivalences = data.map(eq => ({
      ...eq,
      isiCourses: JSON.parse(eq.isiCoursesJson || '{}'),
      srtCourses: JSON.parse(eq.srtCoursesJson || '{}')
    }));
    this.showOptions = new Array(this.equivalences.length).fill(false);
    console.log("this.equivalences", this.equivalences);
  });
}



addCourse() {
  const courseCode = this.courseCodeControl.value;
  const equivalence = this.equivalenceControl.value;

  if (courseCode && equivalence) {
    if (!this.newCourses[courseCode]) {
      this.newCourses[courseCode] = [];
    }
    this.newCourses[courseCode].push(equivalence);
    this.equivalenceControl.setValue('');
  }
}

save() {
  const schoolName = this.schoolNameControl.value;
  const academicLevel = this.academicLevelControl.value;
  const type = this.typeControl.value;

  if (!schoolName || !academicLevel || !type || Object.keys(this.newCourses).length === 0) {
    alert('Please fill in all fields and add at least one course equivalence.');
    return;
  }

  this.equivalenceService.addEquivalence(schoolName, academicLevel, type, this.newCourses)
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


// Toggle the options panel for the clicked file
toggleOptions(index: number): void {
  this.showOptions[index] = !this.showOptions[index]; // Toggle visibility
}

// Edit functionality (example)
editFile(): void {
  console.log('Editing file:');
  // Add your edit logic here
}

// Delete functionality (example)
deleteFile(): void {
  console.log('Deleting file:');
  // Add your delete logic here
}
artists: any;
toggleArtistSelection(arg0: any,$event: Event) {
throw new Error('Method not implemented.');
}
viewArtistDetails(arg0: any) {
throw new Error('Method not implemented.');
}
isModalVisible: boolean = false;

openModal(): void {
  this.isModalVisible = true;
  console.log(this.isModalVisible)
}

closeModal(): void {
  this.isModalVisible = false;
}

handleSave(): void {
  console.log('Data saved!');
  this.closeModal(); // Optionally close the modal after saving
}
}
