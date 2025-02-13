import { Component } from '@angular/core';
import { FileData, PvService } from '../../services/pv/pv.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pv',
  standalone: false,
  templateUrl: './pv.component.html',
  styleUrls: ['./pv.component.scss']
})
export class PvComponent {
  files: FileData[] = []; // All files
  filteredFiles: FileData[] = []; // Filtered files
  sortedFiles: FileData[] = []; // Sorted files

  selectedFileData: FileData | null = null;  // Make sure this matches the type in the modal

  selectedSemester: string | null = null;
  selectedAcademicLevel: string | null = null;
  selectedAcademicYear: string | null = null;
  searchQuery: string = ''; // Search query

  isModalVisible: boolean = false; // Modal visibility state
  modalTitle: string = 'Add PV'; // Modal title (default to 'Add PV')
  selectedFile: FileData | null = null; // Store selected file for edit

  constructor(private http: HttpClient, private fileService:  PvService) {}

  ngOnInit() {
    this.fetchFiles();
  }

  // Fetch files from the server
  fetchFiles(): void {
    this.fileService.fetchFiles().subscribe(data => {
      this.files = data;
      this.applyFilters(); // Apply filters after fetching data
    });
  }

  // Apply filters based on selected criteria
  applyFilters() {
    this.filteredFiles = this.files.filter(file =>
      (!this.selectedSemester || file.semester === this.selectedSemester) &&
      (!this.selectedAcademicLevel || file.classLevel === this.selectedAcademicLevel) &&
      (!this.selectedAcademicYear || file.academicYear === this.selectedAcademicYear) &&
      this.matchSearchQuery(file)
    );
    this.sortedFiles = this.filteredFiles.sort((a, b) => {
      return new Date(b.uploadedTime).getTime() - new Date(a.uploadedTime).getTime();
    });
  }

  // Match files based on the search query
  matchSearchQuery(file: FileData): boolean {
    const query = this.searchQuery.toLowerCase();
    return file.classLevel.toLowerCase().includes(query) || 
           file.uploadedBy.toLowerCase().includes(query);
  }

  // Handle selection of semester
  onSemesterSelected(semester: string) {
    this.selectedSemester = semester === 'All' ? null : semester; // If 'All' is selected, set to null
    this.applyFilters();
  }

  // Handle selection of academic level
  onAcademicLevelSelected(level: string) {
    this.selectedAcademicLevel = level === 'All' ? null : level; // If 'All' is selected, set to null
    this.applyFilters();
  }

  // Handle selection of academic year
  onAcademicYearSelected(year: string) {
    this.selectedAcademicYear = year === 'All' ? null : year; // If 'All' is selected, set to null
    this.applyFilters();
  }

  // Handle the search query from the search bar
  filterStudents(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.applyFilters();
  }

  // Open the modal for adding a new file
  openModal(): void {
    this.modalTitle = 'Add PV'; // Set title to 'Add PV' for new file
    this.selectedFileData = null; // Clear any selected file data
    this.isModalVisible = true;
  }

  // Open the modal for editing an existing file
  editFile(file: FileData): void {
    this.modalTitle = 'Edit PV'; // Set title to 'Edit PV' for editing
    this.selectedFileData = { ...file }; // Clone the file data to pre-fill the modal
    console.log("this.selectedFile", this.selectedFile)
    this.isModalVisible = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalVisible = false;
  }

  // Handle save action from modal (add or update)
  handleSave(): void {
    this.fetchFiles();
    this.closeModal(); // Optionally close the modal after saving
  }
}
