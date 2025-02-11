import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  standalone: false,
  
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

  searchQuery: string = '';
filterStudents(query: string) {
throw new Error('Method not implemented.');
}
deleteSelectedArtists() {
throw new Error('Method not implemented.');
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
