import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-option',
  standalone: false,
  
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss'
})
export class SelectOptionComponent {
  @Input() title: string = 'Select Option';  // Dynamic label
  @Input() options: string[] = []; // Dynamic options

  isDropdownOpen = true;
  selectedOption: string | null = null;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
  }
  getSvgIcon(): string {
    switch (this.title) {
      case 'Semester':
        return 'M552-394h52v-316H480v52h72v264ZM314.31-260q-27.01 0-45.66-18.65Q250-297.3 250-324.31v-455.38q0-27.01 18.65-45.66Q287.3-844 314.31-844h455.38q27.01 0 45.66 18.65Q834-806.7 834-779.69v455.38q0 27.01-18.65 45.66Q796.7-260 769.69-260H314.31Zm0-52h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H314.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-124 176q-27.01 0-45.66-18.65Q126-173.3 126-200.31v-507.38h52v507.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h507.38v52H190.31ZM302-792v480-480Z'; // Example Chevron Down
      case 'Equivalence':
        return 'M298-298h268v-52H298v52Zm0-156h364v-52H298v52Zm0-156h364v-52H298v52Zm-69.69 446q-27.01 0-45.66-18.65Q164-201.3 164-228.31v-503.38q0-27.01 18.65-45.66Q201.3-796 228.31-796h503.38q27.01 0 45.66 18.65Q796-758.7 796-731.69v503.38q0 27.01-18.65 45.66Q758.7-164 731.69-164H228.31Zm0-52h503.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-503.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H228.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v503.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM216-744v528-528Z'; // Example Shield Icon
      case 'Level':
        return 'M302.62-298h51.99v-268h-51.99v268ZM454-298h52v-364h-52v364Zm151.39 0h51.99v-124h-51.99v124ZM228.31-164q-27.01 0-45.66-18.65Q164-201.3 164-228.31v-503.38q0-27.01 18.65-45.66Q201.3-796 228.31-796h503.38q27.01 0 45.66 18.65Q796-758.7 796-731.69v503.38q0 27.01-18.65 45.66Q758.7-164 731.69-164H228.31Zm0-52h503.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-503.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H228.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v503.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM216-744v528-528Z'; // Example User Icon
      case 'Year':
        return 'M228.31-116q-27.01 0-45.66-19Q164-154 164-180.31v-503.38Q164-710 182.65-729q18.65-19 45.66-19h87.38v-100.61h53.54V-748h223.08v-100.61h52V-748h87.38q27.01 0 45.66 19Q796-710 796-683.69v503.38Q796-154 777.35-135q-18.65 19-45.66 19H228.31Zm0-52h503.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-335.38H216v335.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM216-567.69h528v-116q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H228.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v116Zm0 0V-696v128.31Z'; // Example Calendar Icon
      default:
        return 'M6 9l6 6 6-6'; // Default Dropdown Arrow
    }
  }
}
