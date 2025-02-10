import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
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

  // Options for autocomplete
  options: string[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

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
}