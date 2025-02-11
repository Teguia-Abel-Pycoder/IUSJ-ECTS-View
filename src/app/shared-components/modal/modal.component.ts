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
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
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
export class ModalComponent {
  @Input() visible: boolean = false;
  @Input() title: string = 'Modal Title';
  @Input() content: string = 'This is the default content.';
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();

  // Form Control for autocomplete
  classLevelControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  constructor(private overlayContainer: OverlayContainer) {}
  // Options for autocomplete
  options: string[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  ngOnInit() {
    this.overlayContainer.getContainerElement().classList.add('custom-autocomplete-container');
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

  // Save action
  save(): void {
    if (this.classLevelControl.valid) {
      this.onSave.emit();
    } else {
      alert('Please select a valid class level.');
    }
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
}

