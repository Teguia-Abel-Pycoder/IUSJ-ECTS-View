import { Component } from '@angular/core';
import { Equivalence, EquivalenceService } from '../../services/equivalence/equivalence.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-equivalence',
  standalone: false,
  
  templateUrl: './equivalence.component.html',
  styleUrl: './equivalence.component.scss'
})
export class EquivalenceComponent {
equivalences: Equivalence[] = [];

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
constructor(private http: HttpClient, private fileService:  EquivalenceService) {}
// Array to track which file has its options panel displayed
showOptions: boolean[] = [];

ngOnInit() {
  this.fetchEquivalences();
  console.log("this.equivalences", this.equivalences);
}

fetchEquivalences(): void {
  this.fileService.fetchFiles().subscribe(data => {
    this.equivalences = data.map(eq => ({
      ...eq,
      isiCourses: JSON.parse(eq.isiCoursesJson || '{}'),
      srtCourses: JSON.parse(eq.srtCoursesJson || '{}')
    }));
    this.showOptions = new Array(this.equivalences.length).fill(false);
    console.log("this.equivalences", this.equivalences);
  });
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
