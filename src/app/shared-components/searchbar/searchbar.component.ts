import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  standalone: true,
  imports: [FormsModule],  // Add FormsModule here
})
export class SearchbarComponent {
  searchQuery: string = ''; // Local search query

  @Output() searchQueryChange = new EventEmitter<string>(); // Event emitter for sending data to the parent component

  // Emit the search query to the parent component when input changes
  onSearchChange() {
    this.searchQueryChange.emit(this.searchQuery);
  }
}
