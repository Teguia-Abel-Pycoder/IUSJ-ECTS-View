import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log("Router URL on Init:", this.router.url);  // Log router URL at ngOnInit

    // Ensure breadcrumbs are updated immediately on init
    this.updateBreadcrumbs();

    // Listen for navigation events to update breadcrumbs
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("Router URL after NavigationEnd:", this.router.url);  // Log after navigation ends
        this.updateBreadcrumbs();
      }
    });

    console.log("Breadcrumbs on Init: ", this.breadcrumbs);  // Debugging
  }

  updateBreadcrumbs() {
    // Accessing the URL from router and splitting into breadcrumb paths
    const urlSegments = this.router.url.split('/').filter(path => path);
    this.breadcrumbs = urlSegments.map(segment => decodeURIComponent(segment));

    console.log("Updated breadcrumbs:", this.breadcrumbs);  // Debugging
  }

  getBreadcrumbPath(index: number): string {
    return '/' + this.breadcrumbs.slice(0, index + 1).join('/');
  }
}
