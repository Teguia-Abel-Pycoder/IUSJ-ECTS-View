import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'IUSJ-ECTS';
constructor( private router: Router) {}

activeNav: string = '';
    sidebarExpanded: boolean = false;

    setActiveNav(nav: string) {
        this.activeNav = nav;
    }

    toggleSidebar() {
        this.sidebarExpanded = !this.sidebarExpanded;
    }
  
}
