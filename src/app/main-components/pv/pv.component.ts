import { Component } from '@angular/core';
import { FileData, PvService } from '../../services/pv/pv.service';
@Component({
  selector: 'app-pv',
  standalone: false,
  
  templateUrl: './pv.component.html',
  styleUrl: './pv.component.scss'
})
export class PvComponent {


  files: FileData[] = [];

  constructor(private fileService: PvService) {}

  ngOnInit(): void {
    // Fetch files without filters (optional parameters)
    this.fileService.getFiles().subscribe((data) => {
      this.files = data;
    });
  }

  // Convert uploadedTime to a readable format
  formatDateTime(dateTime: string): { date: string; time: string } {
    const dateObj = new Date(dateTime);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  }




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
